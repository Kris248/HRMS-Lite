import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Alert } from '@mui/material';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import { testBackendConnection } from './services/api';

function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [currentBackendURL, setCurrentBackendURL] = useState('');

  // useEffect(() => {
  //   const checkBackend = async () => {
  //     console.log('🔍 Checking backend connection...');
  //     const status = await testBackendConnection();
  //     setBackendStatus(status);
  //     setCurrentBackendURL(status.backendURL || '');
  //   };
    
  //   checkBackend();
  // }, []);

  useEffect(() => {
  console.log('🔍 Checking backend connection...');
  
  // Direct fetch to test
  fetch('https://hrms-lite-2-yb7g.onrender.com/health')
    .then(response => response.json())
    .then(data => {
      console.log('✅ Backend is UP:', data);
      setBackendStatus({ success: true, data });
    })
    .catch(error => {
      console.error('❌ Backend is DOWN:', error);
      setBackendStatus({ success: false, error: error.message });
    });
}, []);
  return (
    <Router>
      <Navbar />
      
      {/* Backend Status Alert */}
      {backendStatus && !backendStatus.success && (
        <Alert 
          severity="warning" 
          sx={{ 
            mx: 2, 
            mt: 2,
            mb: -2 
          }}
        >
          ⚠️ Backend connection failed. 
          {currentBackendURL && ` Trying to connect to: ${currentBackendURL}`}
          <br />
          Please ensure backend is running on Render.
        </Alert>
      )}
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
