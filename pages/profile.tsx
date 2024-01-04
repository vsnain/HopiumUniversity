// pages/profile.js
import React, { useState, useEffect } from 'react';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { useAuth } from './AuthUserProvider';



// Define the styles as a JavaScript object
const styles = {
  profileContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  profileFormContainer: {
    marginTop: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  successMessage: {
    color: '#4caf50',
    marginTop: '10px',
  },
  errorMessage: {
    color: '#f44336',
    marginTop: '10px',
  },
};



const Profile = ({ firestore }) => {
  const { uid, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [leetCodeUrl, setLeetCodeUrl] = useState('');
  const [city, setCity] = useState('');
  const [studyGroup, setStudyGroup] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const extractUsernameFromUrl = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?leetcode\.com\/([^/]+)\/?/);
    return match ? match[1] : url;
  };

  useEffect(() => {
    const fetchLeetCodeUrl = async () => {
      try {
        if (isLoggedIn) {
          const userDocRef = doc(firestore, 'users', uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const leetCodeUsername = extractUsernameFromUrl(userData.leetCodeUrl);
            setLeetCodeUrl(leetCodeUsername || '');
            setCity(userData.city || '');
            setStudyGroup(userData.studyGroup || '');
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchLeetCodeUrl();
  }, [isLoggedIn, uid, firestore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoggedIn && leetCodeUrl && city && studyGroup) {
        setLoading(true);
        const userInput = city.toLowerCase();

        const apiResponse = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ccoordinates&where=%22${userInput}%22&limit=1`
        );
        const apiData = await apiResponse.json();

        if (apiData.total_count > 0) {
          const apiCityData = apiData.results[0];
          const apiCityName = apiCityData.name.toLowerCase();

          if (userInput === apiCityName) {
            const leetCodeResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUrl}`);
            const leetCodeData = await leetCodeResponse.json();

            if (leetCodeData.status === 'success' && leetCodeData.message === 'retrieved' && leetCodeData.totalSolved) {
              const userDocRef = doc(firestore, 'users', uid);
              await setDoc(userDocRef, {
                leetCodeUrl,
                city: apiCityData.name,
                coordinates: apiCityData.coordinates,
                totalSolved: leetCodeData.totalSolved,
                studyGroup,
              }, { merge: true });

              setSuccessMessage('Changes saved successfully!');
              setErrorMessage('');
            } else {
              setErrorMessage(`Username '${leetCodeUrl}' not found or has no LeetCode stats.`);
              setSuccessMessage('');
            }
          } else {
            setErrorMessage(`City '${city}' does not exist in our database.`);
            setSuccessMessage('');
          }
        } else {
          setErrorMessage(`City '${city}' does not exist in our database.`);
          setSuccessMessage('');
        }
      } else {
        setErrorMessage('Please fill in all mandatory fields.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('An error occurred while updating the profile.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.profileContainer}>
      <h1>Profile Page</h1>
      {isLoggedIn && (
        <div style={styles.profileFormContainer}>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>
              LeetCode URL:
              <input
                type="text"
                value={leetCodeUrl}
                onChange={(e) => setLeetCodeUrl(extractUsernameFromUrl(e.target.value))}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              City:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Are you looking for a study group?
              <select
                value={studyGroup}
                onChange={(e) => setStudyGroup(e.target.value)}
                style={styles.input}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <button type="submit" style={styles.button}>
              Save
            </button>
          </form>
          {loading && <p>Saving...</p>}
          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Profile;
