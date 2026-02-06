import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { employeeAPI, attendanceAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    totalAttendance: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll()
      ]);
      
      const today = new Date().toISOString().split('T')[0];
      const todayAttendance = attendanceRes.data.filter(a => a.date === today);
      
      setStats({
        totalEmployees: employeesRes.data.length,
        presentToday: todayAttendance.filter(a => a.status === 'Present').length,
        absentToday: todayAttendance.filter(a => a.status === 'Absent').length,
        totalAttendance: attendanceRes.data.length
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        🏢 HRMS Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Total Employees"
            value={stats.totalEmployees}
            color="#1976d2"
            icon="👥"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Present Today"
            value={stats.presentToday}
            color="#2e7d32"
            icon="✅"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Absent Today"
            value={stats.absentToday}
            color="#d32f2f"
            icon="❌"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Total Records"
            value={stats.totalAttendance}
            color="#ed6c02"
            icon="📊"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              🚀 Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link}
                to="/employees"
                size="large"
              >
                👥 Manage Employees
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                component={Link}
                to="/attendance"
                size="large"
              >
                📅 Mark Attendance
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              ℹ️ System Info
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                • Single admin system (No login required)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Real-time employee management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Daily attendance tracking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • MongoDB database
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Built with React, FastAPI & MongoDB
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;