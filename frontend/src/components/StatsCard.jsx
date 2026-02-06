import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value, color, icon }) => {
  return (
    <Card 
      sx={{ 
        minWidth: 275, 
        backgroundColor: color,
        color: 'white',
        borderRadius: 3,
        boxShadow: 3
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {icon} {title}
        </Typography>
        <Typography variant="h3" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;