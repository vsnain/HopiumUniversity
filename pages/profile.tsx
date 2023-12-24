// pages/profile.js
import React, { useState, useEffect } from 'react';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { useAuth } from './AuthUserProvider';

const majorCities = [
  'New York',
  'London',
  'Paris',
  'Tokyo',
  'Beijing',
  'Sydney',
  'Los Angeles',
  'Berlin',
  'Toronto',
  'Dubai',
];

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
    marginTop: '10px',
  },
  successMessage: {
    color: '#4caf50',
    marginTop: '10px',
  },
};

const Profile = ({ firestore }) => {
  const { uid, isLoggedIn } = useAuth();
  const [leetCodeUrl, setLeetCodeUrl] = useState('');
  const [city, setCity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (isLoggedIn) {
          const userDocRef = doc(firestore, 'users', uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setLeetCodeUrl(userData.leetCodeUrl || '');
            setCity(userData.city || '');
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [isLoggedIn, uid, firestore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoggedIn) {
        const userDocRef = doc(firestore, 'users', uid);

        await setDoc(userDocRef, { leetCodeUrl, city }, { merge: true });

        setSuccessMessage('Changes saved successfully!');
      } else {
        console.error('User not logged in');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
                onChange={(e) => setLeetCodeUrl(e.target.value)}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              City:
              <input
                type="text"
                list="cities"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={styles.input}
              />
              <datalist id="cities">
                {majorCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </label>
            <button type="submit" style={styles.button}>
              Save
            </button>
          </form>
          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Profile;
