import React, { useState } from 'react';
import { Card, CardContent, Grid, Box, Container, Typography } from '@mui/material';
import QuestionList from './QuestionList';

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
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                ...cardStyle,
                backgroundColor: isCardSelected('easy') ? 'grey' : 'white',
                marginBottom: '16px',
              }}
              onClick={() => handleCardClick('easy')}
            >
              <CardContent>
                <Typography variant="body1">Easy</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                ...cardStyle,
                backgroundColor: isCardSelected('medium') ? 'grey' : 'white',
                marginBottom: '16px',
              }}
              onClick={() => handleCardClick('medium')}
            >
              <CardContent>
                <Typography variant="body1">Medium</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                ...cardStyle,
                backgroundColor: isCardSelected('hard') ? 'grey' : 'white',
                marginBottom: '16px',
              }}
              onClick={() => handleCardClick('hard')}
            >
              <CardContent>
                <Typography variant="body1">Hard</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {selectedCard && <QuestionList difficulty={selectedCard} />}
      </Container>
    </Box>
  );
};

export default Leetcode;
