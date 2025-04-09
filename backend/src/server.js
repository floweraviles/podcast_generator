const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const podcastRoutes = require("./routes/podcastRoutes");
const scriptRoutes = require("./routes/scriptRoutes");

dotenv.config();

const app = express();

//Middleware 
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/scripts", scriptRoutes);
app.use("/audio", express.static(path.join(__dirname, "public/audio")));

//Start Server
const PORT = process.env.PORT || 5001;
sequelize.sync().then(() => {
    console.log("Database connected.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});