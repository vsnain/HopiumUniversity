import React from 'react';
import { Card, CardContent, Grid, Box, Container } from '@mui/material';

const Leetcode = () => {
  return (
    <Box mt={2} display="flex" >
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={3}>
            <Card sx={{ height: '40px', border: '4px solid grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent>
                <p>Easy</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ height: '40px', border: '4px solid grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent>
                <p>Medium</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ height: '40px', border: '4px solid grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent>
                <p>Hard</p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Leetcode;