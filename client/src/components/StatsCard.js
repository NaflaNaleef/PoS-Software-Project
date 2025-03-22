import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const StatsCard = ({ title, value }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ textAlign: "center", padding: 2 }}>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="h4">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StatsCard;
