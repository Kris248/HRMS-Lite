import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Alert } from '@mui/material';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { employeeAPI } from '../services/api';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employeeData) => {
    try {
      await employeeAPI.create(employeeData);
      setOpenForm(false);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add employee');
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(employeeId);
        fetchEmployees();
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          👥 Employee Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenForm(true)}
          size="large"
        >
          + Add Employee
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography>Loading employees...</Typography>
      ) : (
        <EmployeeList 
          employees={employees} 
          onDelete={handleDeleteEmployee}
        />
      )}

      <EmployeeForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleAddEmployee}
      />
    </Box>
  );
}

export default Employees;