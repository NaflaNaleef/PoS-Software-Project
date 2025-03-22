
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard";
import SalesChart from "../../components/Charts/SalesChart";
import StatsChart from "../../components/Charts/StatsChart";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 120,
    totalProducts: 350,
    totalOrders: 450,
    ordersToday: 15,
    amountToday: 12000,
    totalRevenue: 50000,
    salesData: [{"date":"2025-03-22","sales":15000}],
    statsData: [{"category":"Electronics","count":120}],
  });

  useEffect(() => {
    axios.get("/api/dashboard")
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching dashboard data:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Overall Stats */}
      <Grid container spacing={2}>
        <StatsCard title="Total Customers" value={stats.totalCustomers} />
        <StatsCard title="Total Products" value={stats.totalProducts} />
        <StatsCard title="Total Orders" value={stats.totalOrders} />
        <StatsCard title="Orders received today" value={stats.ordersToday} />
        <StatsCard title="Amount received today" value={stats.amountToday} />
        <StatsCard title="Overall Amount" value={stats.totalRevenue} />
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2} mt={3}>
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
