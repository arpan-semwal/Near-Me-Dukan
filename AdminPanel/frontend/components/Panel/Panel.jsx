import React from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const icons = [
  <DashboardIcon fontSize="large" />,
  <StoreIcon fontSize="large" />,
  <CategoryIcon fontSize="large" />,
  <AccountCircleIcon fontSize="large" />,
  <SettingsIcon fontSize="large" />,
  <ExitToAppIcon fontSize="large" />,
  <DashboardIcon fontSize="large" />,
  <StoreIcon fontSize="large" />,
  <CategoryIcon fontSize="large" />,
  <AccountCircleIcon fontSize="large" />,
  <SettingsIcon fontSize="large" />,
  <ExitToAppIcon fontSize="large" />,
  <DashboardIcon fontSize="large" />,
  <StoreIcon fontSize="large" />,
  <CategoryIcon fontSize="large" />,
];

export default function Panel() {
  const laptopViewportHeight = window.innerHeight;

  return (
    <Container maxWidth="lg" sx={{ paddingX: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ marginTop: '20px', marginBottom: '20px' }}>
        My ID: Admin
      </Typography>
      <Grid container spacing={3} alignItems="flex-start">
        {icons.map((icon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} style={{ maxHeight: laptopViewportHeight / 5 }}>
            <Card style={{ height: '100%', padding: '10px', width: '100%' }}> {/* Adjust width here */}
              <CardContent style={{ display: 'flex' }}>
                <div style={{ marginRight: 16 }}>{icon}</div>
                <div>
                  <Typography variant="h7" component="div">
                    Card {index + 1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Description of card {index + 1}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
