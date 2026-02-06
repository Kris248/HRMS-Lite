import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box
} from '@mui/material';

const AttendanceList = ({ attendance, employees }) => {
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.employee_id === employeeId);
    return employee ? employee.full_name : 'Unknown';
  };

  const getEmployeeDepartment = (employeeId) => {
    const employee = employees.find(e => e.employee_id === employeeId);
    return employee ? employee.department : 'N/A';
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendance.map((record) => (
            <TableRow 
              key={record.id}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Chip 
                  label={new Date(record.date).toLocaleDateString('en-IN')}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ fontFamily: 'monospace' }}>
                  {record.employee_id}
                </Box>
              </TableCell>
              <TableCell>
                {getEmployeeName(record.employee_id)}
              </TableCell>
              <TableCell>
                {getEmployeeDepartment(record.employee_id)}
              </TableCell>
              <TableCell>
                <Chip
                  label={record.status}
                  color={record.status === 'Present' ? 'success' : 'error'}
                  sx={{ 
                    fontWeight: 'bold',
                    width: 100
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
          {attendance.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                <Box sx={{ color: 'text.secondary' }}>
                  No attendance records found. Mark attendance to see records here.
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceList;