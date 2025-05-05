// import React, { useEffect, useState } from "react";
// import { Container, Grid, Typography } from "@mui/material";
// import StatsCard from "../../components/StatsCard";
// import SalesChart from "../../components/Charts/SalesChart";
// import StatsChart from "../../components/Charts/StatsChart";
// import axios from "axios";
// import io from "socket.io-client";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalCustomers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     ordersToday: 0,
//     amountToday: 0,
//     totalRevenue: 0,
//     salesData: [],
//     statsData: [],
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/dashboard");
//       setStats(response.data);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats(); // Initial fetch

//     const socket = io("http://localhost:5000");

//     socket.on("customerUpdated", fetchStats);
//     socket.on("orderUpdated", fetchStats);
//     socket.on("productUpdated", fetchStats);

//     return () => {
//       socket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   if (loading) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading dashboard...</div>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Dashboard
//       </Typography>

//       {/* Overall Stats */}
//       <Grid container spacing={2}>
//         <StatsCard title="Total Customers" value={stats.totalCustomers} />
//         <StatsCard title="Total Products" value={stats.totalProducts} />
//         <StatsCard title="Total Orders" value={stats.totalOrders} />
//         <StatsCard title="Orders received today" value={stats.ordersToday} />
//         <StatsCard title="Amount received today" value={stats.amountToday} />
//         <StatsCard title="Overall Amount" value={stats.totalRevenue} />
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} md={6}>
//           <SalesChart data={stats.salesData} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <StatsChart data={stats.statsData} />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard";
import SalesChart from "../../components/Charts/SalesChart";
import StatsChart from "../../components/Charts/StatsChart";
import axios from "axios";
import io from "socket.io-client";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    ordersToday: 0,
    amountToday: 0,
    totalRevenue: 0,
    salesData: [],
    statsData: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      "orderUpdated",
      "productUpdated",
      "dashboardUpdate"
    ];

    updateEvents.forEach(event => {
      socket.on(event, fetchStats);
    });

    return () => {
      updateEvents.forEach(event => {
        socket.off(event, fetchStats);
      });
      socket.disconnect();
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
      <Typography variant="h4" gutterBottom component="div" sx={{ mt: 3, mb: 3 }}>
      MAM Stores Dashboard
      </Typography>

      <Grid container spacing={3}>
        <StatsCard title="Total Customers" value={stats.totalCustomers} />
        <StatsCard title="Total Products" value={stats.totalProducts} />
        <StatsCard title="Total Orders" value={stats.totalOrders} />
        <StatsCard title="Orders received today" value={stats.ordersToday} />
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