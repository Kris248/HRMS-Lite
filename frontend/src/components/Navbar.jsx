import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          🏢 HRMS Lite
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link 
            to="/" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/employees" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            👥 Employees
          </Link>
          <Link 
            to="/attendance" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            📅 Attendance
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;