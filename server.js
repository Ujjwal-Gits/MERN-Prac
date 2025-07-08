const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

const auth = require("./middleware/auth");

const employeeRoutes = require("./routes/employees");
app.use("/api/employees", auth, employeeRoutes);

const departmentRoutes = require("./routes/departments");
app.use("/api/departments", departmentRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/hrms_db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const logger = require("./middleware/logger");
app.use(logger);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
