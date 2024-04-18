const db = require("./models");

// Configuration
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/public", express.static(path.join(__dirname, "public")));
require("dotenv").config();

const port = process.env.PORT;

app.use((req, res, next) => {
  // console.log();
  // console.log();
  // console.log();
  // console.log();
  // console.log();
  // console.log();
  // console.log();

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization, data"
  );
  next();
});

const ecommerceRoutes = require("./routes/ecommerceRoutes");
const bdRoutes = require("./routes/bdRoutes");
const hrRoutes = require("./routes/hrRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const trial = require("./routes/trial");

app.use("/ecommerce", ecommerceRoutes);
app.use("/bd", bdRoutes);
app.use("/hr-admin", hrRoutes);
app.use("/employee", employeeRoutes);
app.use("/upload", trial);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
