

import React, { useEffect, useState } from "react";
import { Container, Grid, Typography,Box } from "@mui/material";
import StatsCard from "../../components/StatsCard";
import SalesChart from "../../components/Charts/SalesChart";
import StatsChart from "../../components/Charts/StatsChart";
import axios from "axios";
import io from "socket.io-client";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalSales: 0,
    salesToday: 0,
    amountToday: 0,
    totalRevenue: 0,
    salesData: [],
    statsData: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const fetchStats = async () => {
    try {
      setError(null);
      const response = await axios.get("/api/dashboard");
      setStats(response.data);
    } catch (error) {
      setError("Failed to load dashboard data");
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    const updateEvents = [
      "customerUpdated",
      "salesUpdated",
      "productUpdated",
      "dashboardUpdate"
    ];

    updateEvents.forEach(event => {
      socket.on(event, fetchStats);
    });

   // Update date and time every second
   const timer = setInterval(() => {
    setCurrentDateTime(new Date());
  }, 1000);

    return () => {
      updateEvents.forEach(event => {
        socket.off(event, fetchStats);
      });
      socket.disconnect();
      clearInterval(timer); // Clean up the interval on unmount

    };
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        {error}
      </div>
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
        <StatsCard title="Total Sales" value={stats.totalSales} />
        <StatsCard title="Sales Today" value={stats.salesToday} />
        <StatsCard title="Amount received today" value={`Rs. ${stats.amountToday.toFixed(2)}`} />
        <StatsCard title="Overall amount" value={`Rs.${stats.totalRevenue.toFixed(2)}`} />
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <SalesChart data={stats.salesData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsChart data={stats.statsData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;