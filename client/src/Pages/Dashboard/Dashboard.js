


import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import StatsCard from "../../components/StatsCard";
import SalesChart from "../../components/Charts/SalesChart";
import StatsChart from "../../components/Charts/StatsChart";
import axios from "axios";
import io from "socket.io-client";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    salesData: [],
    statsData: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Debug checks for components
  console.log('[DEBUG] SalesChart component type:', typeof SalesChart);
  console.log('[DEBUG] StatsChart component type:', typeof StatsChart);
  console.log('[DEBUG] Are components valid:', 
    React.isValidElement(<SalesChart data={[]} />), 
    React.isValidElement(<StatsChart data={[]} />)
  );

  const fetchStats = async () => {
    try {
      setError(null);
      const response = await axios.get("/api/dashboard");
      console.log('[DEBUG] API response:', response.data);
      
      // Validate and format the data
      const validatedData = {
        totalCustomers: Number(response.data.totalCustomers) || 0,
        totalProducts: Number(response.data.totalProducts) || 0,
        salesData: Array.isArray(response.data.salesData) ? response.data.salesData : [],
        statsData: Array.isArray(response.data.statsData) ? response.data.statsData : [],
      };
      
      setStats(validatedData);
    } catch (error) {
      console.error('[ERROR] Fetching dashboard data:', error);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    const updateEvents = [
      "customerUpdated",
      "productUpdated",
    ];

    updateEvents.forEach(event => {
      socket.on(event, fetchStats);
    });

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      updateEvents.forEach(event => {
        socket.off(event, fetchStats);
      });
      socket.disconnect();
      clearInterval(timer);
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography variant="h6">Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="div" sx={{ mt: 3 }}>
          MAM Store Dashboard
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: 'text.primary'
          }}
        >
          {currentDateTime.toLocaleDateString()} - {currentDateTime.toLocaleTimeString()}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <StatsCard title="Total Customers" value={stats.totalCustomers} />
        <StatsCard title="Total Products" value={stats.totalProducts} />
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          {stats.salesData.length > 0 ? (
            <SalesChart data={stats.salesData} />
          ) : (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography color="textSecondary">No sales data available</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {stats.statsData.length > 0 ? (
            <StatsChart data={stats.statsData} />
          ) : (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography color="textSecondary">No statistics data available</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;