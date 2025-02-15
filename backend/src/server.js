require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const podcastRoutes = require("./routes/podcastRoutes");
const scriptRoutes = require("./routes/scriptRoutes");

const app = express();

//Middleware 
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("api/scripts", scriptRoutes);

//Start Server
const PORT = process.env.PORT || 5001;
sequelize.sync().then(() => {
    console.log("Database connected.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});