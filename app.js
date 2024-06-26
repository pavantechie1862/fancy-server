const db = require("./models");
const cors = require("cors");
// Configuration
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));
require("dotenv").config();

const port = process.env.PORT;

app.use((req, res, next) => {
  console.log("request triggered");
  console.log();
  console.log();
  console.log();

  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "http://192.168.1.7:85");

  res.header("Access-Control-Allow-Credentials", false);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization, data"
  );
  // setInterval(() => {
  //   next();
  // }, 3000);
  next();
});

const ecommerceRoutes = require("./routes/ecommerceRoutes");
const bdRoutes = require("./routes/bdRoutes");
const hrRoutes = require("./routes/hrRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const trial = require("./routes/trial");
const admin = require("./routes/adminRoutes");
const reports = require("./routes/reportRoutes");

app.use("/ecommerce", ecommerceRoutes);
app.use("/bd", bdRoutes);
app.use("/hr-admin", hrRoutes);
app.use("/employee", employeeRoutes);
app.use("/admin", admin);
app.use("/reports", reports);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

// {
//   "development": {
//     "username": "root",
//     "password": "keka@3061",
//     "database": "fancy",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "define": {
//       "timestamps": false
//     },
//     "pool": {
//       "max": 5,
//       "min": 0,
//       "acquire": 30000,
//       "idle": 10000
//     }
//   },
//   "test": {
//     "username": "admin",
//     "password": "rgukt123",
//     "database": "lims",
//     "host": "fancy-lims.c98oisyqu0gw.ap-south-1.rds.amazonaws.com",
//     "dialect": "mysql",
//     "connectTimeout": 30000,
//     "define": {
//       "timestamps": false
//     },
//     "pool": {
//       "max": 5,
//       "min": 0,
//       "acquire": 30000,
//       "idle": 10000
//     }
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
