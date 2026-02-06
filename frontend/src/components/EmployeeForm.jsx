import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography  // ADD THIS IMPORT
} from '@mui/material';

const EmployeeForm = ({ open, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    employee_id: initialData.employee_id || '',
    full_name: initialData.full_name || '',
    email: initialData.email || '',
    department: initialData.department || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employee_id.trim()) {
      newErrors.employee_id = 'Employee ID is required';
    }
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">
          {initialData.employee_id ? 'Edit Employee' : 'Add New Employee'}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box component="form" noValidate>
          <TextField
            autoFocus
            margin="dense"
            name="employee_id"
            label="Employee ID"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.employee_id}
            onChange={handleChange}
            error={!!errors.employee_id}
            helperText={errors.employee_id}
            required
            disabled={!!initialData.employee_id}
          />
          <TextField
            margin="dense"
            name="full_name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.full_name}
            onChange={handleChange}
            error={!!errors.full_name}
            helperText={errors.full_name}
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.department}
            onChange={handleChange}
            error={!!errors.department}
            helperText={errors.department}
            required
            select
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          {initialData.employee_id ? 'Update' : 'Add Employee'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;