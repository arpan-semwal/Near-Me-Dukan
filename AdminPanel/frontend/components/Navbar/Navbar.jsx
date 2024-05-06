import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Collapse, Typography, Divider, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import MainCategoryIcon from '@mui/icons-material/Category';
import SubcategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Transition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [openMainCategory, setOpenMainCategory] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openSubcategories, setOpenSubcategories] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleStoreClick = () => {
    setOpenStore(!openStore);
  };

  const handleMainCategoryClick = () => {
    setOpenMainCategory(!openMainCategory);
  };

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  const handleSubcategoriesClick = () => {
    setOpenSubcategories(!openSubcategories);
  };

  const handleViewCategoryClick = () => {
    navigate('/viewcategory'); // Navigate to viewcategory page
  };
  const handleAddCategoryClick = () => {
    navigate('/addmaincategory'); // Navigate to viewcategory page
  };

  const handleDashboardNavigation = () => {
      navigate('/');    
  }
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Near Ki Dukan
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} variant="temporary" sx={{
        '& .MuiDrawer-paper': {
          width: '20%',
          '@media (max-width:600px)': {
            width: '60%',
          },
          backgroundColor: '#343a40',
          color: 'white', // Text color here
        },
      }}>
        <List>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
            <img src="../../src/assets/logo.png" alt="Logo" style={{ width: '80px', height: '80px' }} />
            <Divider style={{ width: '80%', marginTop: '10px', marginBottom: '10px' }} />
          </div>
          <Divider style={{ width: '80%', marginTop: '10px', marginBottom: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar alt="Admin" src="/path/to/your/profile-picture.jpg" sx={{ width: 32, height: 32, marginBottom: '10px', marginRight: '5px' }} />
            <Typography variant="subtitle1" sx={{ color: 'white' }}>Admin</Typography>
          </div>
          <Divider style={{ width: '80%', marginTop: '10px', marginBottom: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <DashboardIcon />
            <Typography onClick={handleDashboardNavigation} variant="subtitle1" sx={{ marginLeft: '10px', color: 'white' } }>Dashboard</Typography>
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ marginLeft: '10px', color: 'white' }}>Shop</Typography>
          </div>
          <ListItem button onClick={handleStoreClick}>
            <StoreIcon />
            <ListItemText primary="Store" primaryTypographyProps={{ color: 'white' }} />
            {openStore ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Transition in={openStore} timeout={300} mountOnEnter unmountOnExit>
            {(state) => (
              <div style={{
                transition: 'opacity 0.3s',
                opacity: state === 'entered' ? 1 : 0,
              }}>
                <Collapse in={openStore} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Category 1" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Category 2" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                    <ListItem button> {/* Handle click for View Category */}
                      <ListItemText primary="View Category" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            )}
          </Transition>
          {/* Main Category */}
          <ListItem button onClick={handleMainCategoryClick}>
            <MainCategoryIcon />
            <ListItemText primary="Main Category" primaryTypographyProps={{ color: 'white' }} />
            {openMainCategory ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Transition in={openMainCategory} timeout={300} mountOnEnter unmountOnExit>
            {(state) => (
              <div style={{
                transition: 'opacity 0.3s',
                opacity: state === 'entered' ? 1 : 0,
              }}>
                <Collapse in={openMainCategory} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button  onClick={handleAddCategoryClick}>
                      <ListItemText primary="Add main category" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                    <ListItem button  onClick={handleViewCategoryClick}>
                      <ListItemText primary="View Category" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            )}
          </Transition>
          {/* Categories */}
          <ListItem button onClick={handleCategoriesClick}>
            <CategoryIcon />
            <ListItemText primary="Categories" primaryTypographyProps={{ color: 'white' }} />
            {openCategories ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Transition in={openCategories} timeout={300} mountOnEnter unmountOnExit>
            {(state) => (
              <div style={{
                transition: 'opacity 0.3s',
                opacity: state === 'entered' ? 1 : 0,
              }}>
                <Collapse in={openCategories} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Category A" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Category B" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            )}
          </Transition>
          {/* Subcategories */}
          <ListItem button onClick={handleSubcategoriesClick}>
            <SubcategoryIcon />
            <ListItemText primary="Subcategories" primaryTypographyProps={{ color: 'white' }} />
            {openSubcategories ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Transition in={openSubcategories} timeout={300} mountOnEnter unmountOnExit>
            {(state) => (
              <div style={{
                transition: 'opacity 0.3s',
                opacity: state === 'entered' ? 1 : 0,
              }}>
                <Collapse in={openSubcategories} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Subcategory A" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Subcategory B" primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            )}
          </Transition>
          <Divider style={{ width: '80%', marginTop: '10px', marginBottom: '10px' }} />
          <Typography variant="subtitle1" sx={{ color: 'white', marginBottom: '10px' }}>Settings</Typography>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <AccountCircleIcon />
            <Typography variant="subtitle1" sx={{ marginLeft: '10px', color: 'white' }}>Profile</Typography>
          </div>
          {/* Logout */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <ExitToAppIcon />
            <Typography variant="subtitle1" sx={{ marginLeft: '10px', color: 'white' }}>Logout</Typography>
          </div>
        </List>
      </Drawer>
    </div>
  );
}
