import React, { useState } from 'react';
import { Card, CardContent, Grid, Box, Container, Typography } from '@mui/material';
import UserList from './UserList';
// import QuestionList from './QuestionList';

const cardStyle = {
  height: '40px',
  border: '4px solid grey',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const Leetcode = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card === selectedCard ? null : card);
  };

  const isCardSelected = (card) => card === selectedCard;

  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={4} sm={4}>
            <Card
              sx={{
                ...cardStyle,
                backgroundColor:'white',
                marginBottom: '16px',
              }}
              // onClick={() => handleCardClick('easy')}
            >
              <CardContent>
                <Typography variant="body1">UserName</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Card
              sx={{
                ...cardStyle,
                backgroundColor:'white',
                marginBottom: '16px',
              }}
              // onClick={() => handleCardClick('medium')}
            >
              <CardContent>
                <Typography variant="body1">City</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Card
              sx={{
                ...cardStyle,
                backgroundColor: isCardSelected('problemssolved') ? 'grey' : 'white',
                marginBottom: '16px',
              }}
              // onClick={() => handleCardClick('problemssolved')}
            >
              <CardContent>
                <Typography variant="body1">Solved</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <UserList/>

      </Container>
    </Box>
  );
};

export default Leetcode;
