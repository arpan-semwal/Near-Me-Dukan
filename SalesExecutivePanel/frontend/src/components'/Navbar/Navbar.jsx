import React, { useState } from 'react';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={styles.container}>
      <div style={styles.appBar}>
        <div style={styles.menuButton} onClick={toggleDrawer}>
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
        </div>
      </div>
      <div style={{ ...styles.drawer, right: drawerOpen ? '0' : '-240px' }}>
        <div style={styles.drawerItem} onClick={toggleDrawer}>Option 1</div>
        <div style={styles.drawerItem} onClick={toggleDrawer}>Option 2</div>
        <div style={styles.drawerItem} onClick={toggleDrawer}>Option 3</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
  },
  appBar: {
    backgroundColor: '#333',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '999',
  },
  menuButton: {
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px',
  },
  menuIcon: {
    width: '100%',
    height: '5px',
    backgroundColor: '#fff',
    borderRadius: '2px',
  },
  drawer: {
    backgroundColor: '#333',
    position: 'fixed',
    top: '60px',
    bottom: '0',
    width: '240px',
    transition: 'right 0.3s ease',
  },
  drawerItem: {
    padding: '20px',
    cursor: 'pointer',
    color: '#fff',
  },
};
