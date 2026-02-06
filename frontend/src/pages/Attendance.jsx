import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AttendanceTracker from '../components/AttendanceTracker';
import AttendanceList from '../components/AttendanceList';
import { attendanceAPI, employeeAPI } from '../services/api';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchAllAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const fetchAllAttendance = async () => {
    try {
      const response = await attendanceAPI.getAll();
      setAttendance(response.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    }
  };

  const handleMarkAttendance = async () => {
    if (!selectedEmployee) {
      setMessage('Please select an employee');
      return;
    }

    try {
      await attendanceAPI.mark({
        employee_id: selectedEmployee,
        date: date,
        status: status
      });
      
      setMessage('✅ Attendance marked successfully!');
      setSelectedEmployee('');
      setStatus('Present');
      
      // Refresh data after 1 second
      setTimeout(() => {
        fetchAllAttendance();
        setMessage('');
      }, 1000);
      
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.detail || 'Failed to mark attendance'}`);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        📅 Attendance Management
      </Typography>

      <AttendanceTracker
        employees={employees}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
        onMarkAttendance={handleMarkAttendance}
        message={message}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
        📋 Attendance Records
      </Typography>
      
      <AttendanceList 
        attendance={attendance} 
        employees={employees}
      />
    </Box>
  );
}

export default Attendance;