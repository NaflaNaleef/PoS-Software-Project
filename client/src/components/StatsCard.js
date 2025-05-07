



import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const StatsCard = ({ title, value, isCurrency = false }) => {
  const displayValue = isCurrency 
    ? `Rs. ${typeof value === 'number' ? value.toFixed(2) : '0.00'}` 
    : value;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ textAlign: "center", padding: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {displayValue}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StatsCard;