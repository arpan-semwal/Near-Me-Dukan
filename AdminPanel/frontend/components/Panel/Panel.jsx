/* eslint-disable react/jsx-key */
import { Link } from 'react-router-dom';
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
];
const cardNames = [
  'Shopkeepers',
  'Admin',
 
  <Link to="/view_sales_associate">View Sales Associate</Link>,
  <Link to="/sales_associate_team">Sales Associates Team</Link>,
  <Link to="/commission_setting">Commission Setting</Link>,
  <Link to="/product_master">Products Master</Link>, // Added the link for Products Master
  'Users',
];

export default function Panel() {
  const cardHeight = 100; // Decreased card height
 
  return (
    <Container maxWidth="lg" sx={{ paddingX: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ marginTop: '20px', marginBottom: '20px' }}>
        My ID: Admin
      </Typography>
      <Grid container spacing={3} alignItems="flex-start">
        {icons.map((icon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            {cardNames[index] === 'Shopkeepers' ? (
              <Link to={`/shopkeeper`}>
                <Card style={{ height: cardHeight, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                  <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ marginRight: '16px' }}>{icon}</div>
                      <Typography variant="body1" component="div">
                        {cardNames[index]}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card style={{ height: cardHeight, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ marginRight: '16px' }}>{icon}</div>
                    <Typography variant="body1" component="div">
                      {cardNames[index]}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
