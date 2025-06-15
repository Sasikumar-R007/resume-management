const candidateRoutes = require("./routes/candidateRoutes");

// use middleware
app.use("/api/candidates", candidateRoutes);
