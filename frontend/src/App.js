import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, Alert } from '@mui/material';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import { testConnection } from './services/api';

function App() {
  const [backendStatus, setBackendStatus] = React.useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      const status = await testConnection();
      setBackendStatus(status);
    };
    
    checkBackend();
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      
      {backendStatus && backendStatus.status === 'error' && (
        <Alert 
          severity="warning" 
          sx={{ 
            mx: 2, 
            mt: 2,
            mb: -2 
          }}
        >
          ⚠️ Backend connection failed. Please ensure backend server is running on port 8000.
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