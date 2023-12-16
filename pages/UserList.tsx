import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Box, Container, Typography } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersModule = await import('./userListData');
        setUsers(usersModule.default);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div
          key={index}
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
                <p>{user.username}</p>
            </Grid>
            <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
                <p>{user.city}</p>
            </Grid>
            <Grid item xs={4} sm={4} sx={{ textAlign: 'center' }}>
                <p>{user.problemsSolved}</p>
            </Grid>
        </Grid>
        </div>
      ))}
    </div>
  );
};

export default UserList;
