import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import baseURL from '../../metro';

function SalesAssociateTeam() {
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    // Fetch executives from backend when component mounts
    axios.get(`${baseURL}/sales_executives_team`)
      .then(response => {
        setExecutives(response.data);
      })
      .catch(error => {
        console.error('Error fetching sales executives:', error);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingX: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ marginTop: '20px', marginBottom: '20px' }}>
        Sales Executives
      </Typography>
      <Grid container spacing={3} alignItems="flex-start">
        {executives.map(executive => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={executive.id}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {`${executive.firstName} ${executive.lastName}`}
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                  <strong>Mobile No:</strong> {executive.mobileNo}
                </Typography>
                <Typography variant="body1" component="div">
                  <strong>Team Leader:</strong> {executive.teamLeaderName || 'None'}
                </Typography>
                <Typography variant="body1" component="div">
                  <strong>Added By:</strong> {executive.addedByName || 'None'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SalesAssociateTeam;
