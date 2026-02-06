import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography  // ADD THIS IMPORT
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const EmployeeList = ({ employees, onDelete }) => {
  const departments = {
    'IT': 'primary',
    'HR': 'secondary',
    'Finance': 'success',
    'Marketing': 'warning',
    'Operations': 'error'
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Full Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow 
              key={employee.id}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Chip 
                  label={employee.employee_id}
                  color="primary"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="medium">
                  {employee.full_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {employee.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={employee.department}
                  color={departments[employee.department] || 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton 
                  color="primary" 
                  size="small"
                  sx={{ mr: 1 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton 
                  color="error" 
                  size="small"
                  onClick={() => onDelete(employee.employee_id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No employees found. Add your first employee!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;