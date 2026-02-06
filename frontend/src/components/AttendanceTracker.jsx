import React from 'react';
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Box,
  Alert,
  Typography  // ADD THIS IMPORT
} from '@mui/material';

const AttendanceTracker = ({
  employees,
  selectedEmployee,
  setSelectedEmployee,
  date,
  setDate,
  status,
  setStatus,
  onMarkAttendance,
  message
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          📝 Mark Daily Attendance
        </Typography>
        {message && (
          <Alert severity={message.includes('successfully') ? 'success' : 'error'}>
            {message}
          </Alert>
        )}
      </Box>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Select Employee</InputLabel>
            <Select
              value={selectedEmployee}
              label="Select Employee"
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <MenuItem value="">
                <em>Select an employee</em>
              </MenuItem>
              {employees.map((employee) => (
                <MenuItem key={employee.employee_id} value={employee.employee_id}>
                  {employee.full_name} ({employee.employee_id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            type="date"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Present">
                <Box sx={{ color: 'green', fontWeight: 'bold' }}>Present</Box>
              </MenuItem>
              <MenuItem value="Absent">
                <Box sx={{ color: 'red', fontWeight: 'bold' }}>Absent</Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={onMarkAttendance}
            disabled={!selectedEmployee}
            fullWidth
            size="large"
          >
            📌 Mark Attendance
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AttendanceTracker;