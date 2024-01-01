import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useAuth } from './AuthUserProvider';
import Grid from '@mui/material/Grid';

const firestore = getFirestore();

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const UserList = () => {
  const { uid } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentUserCoordinates, setCurrentUserCoordinates] = useState({ lat: 0, lon: 0 });

  // Fetch current user's coordinates from Firestore based on the UID
  // Fetch current user's coordinates from Firestore based on the UID
  useEffect(() => {
    const fetchCurrentUserCoordinates = async () => {
      try {
        if (uid) {
          const userDocRef = doc(firestore, 'users', uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setCurrentUserCoordinates({
              lat: userData.coordinates?.lat || 0,
              lon: userData.coordinates?.lon || 0,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching current user coordinates:', error);
      }
    };

    fetchCurrentUserCoordinates();
  }, [uid]);


  // Fetch all users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const userData = usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const usersWithDistance = userData
          .filter((user) => user.coordinates && user.coordinates.lat && user.coordinates.lon)
          .map((user) => ({
            ...user,
            distance: calculateDistance(
              currentUserCoordinates.lat,
              currentUserCoordinates.lon,
              user.coordinates.lat,
              user.coordinates.lon
            ),
          }));

        const sortedUsers = usersWithDistance.sort((a, b) => a.distance - b.distance);

        // Limit to 50 users
        const limitedUsers = sortedUsers.slice(0, 50);

        const usersWithoutDistance = limitedUsers.map(({ distance, ...rest }) => rest);

        setUsers(usersWithoutDistance);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch users when currentUserCoordinates is available
    if (currentUserCoordinates.lat !== 0 || currentUserCoordinates.lon !== 0) {
      fetchUsers();
    }
  }, [currentUserCoordinates]);

  return (
    <div>
      {users.map((user, index) => (
        <div
          key={index}
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '8px',
            marginBottom: '8px',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
                <p>{user.leetCodeUrl}</p>
            </Grid>
            <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
                <p>{user.city}</p>
            </Grid>
            <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
                <p>{user.problemsSolved || 0}</p>
            </Grid>
        </Grid>
        </div>
      ))}
    </div>
  );
};

export default UserList;
