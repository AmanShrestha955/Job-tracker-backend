const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");
const applicationRoutes = require("./routes/application.routes");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Job Tracker API" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
