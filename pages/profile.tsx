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
  const { name, email, photo, uid, isLoggedIn, signInWithGoogle, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [leetCodeUrl, setLeetCodeUrl] = useState('');
  const [city, setCity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const extractUsernameFromUrl = (url) => {
    // Extract username from the LeetCode URL or return the input as is if it's already a username
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
      if (isLoggedIn) {
        setLoading(true);
        // Convert user input to lowercase for case-insensitive comparison
        const userInput = city.toLowerCase();
  
        // Call the OpenDataSoft API
        const apiResponse = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ccoordinates&where=%22${userInput}%22&limit=1`
        );
        const apiData = await apiResponse.json();
  
        // Check if the city exists in the API response
        if (apiData.total_count > 0) {
          const apiCityData = apiData.results[0];
          const apiCityName = apiCityData.name.toLowerCase();
  
          // Check if the user input matches the API result
          if (userInput === apiCityName) {
            // Update LeetCode stats
            const leetCodeResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUrl}`);
            const leetCodeData = await leetCodeResponse.json();
  
            if (leetCodeData.status === "success" && leetCodeData.message === "retrieved" && leetCodeData.totalSolved) {
              // Update the user's document in Firestore
              const userDocRef = doc(firestore, 'users', uid);
              await setDoc(userDocRef, { leetCodeUrl, city: apiCityData.name, coordinates: apiCityData.coordinates, totalSolved: leetCodeData.totalSolved }, { merge: true });
  
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
        console.error('User not logged in');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('An error occurred while updating the profile.');
      setSuccessMessage('');
    }
    finally {
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
