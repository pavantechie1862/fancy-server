const db = require("./models");

// Configuration
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
require("dotenv").config();

const port = process.env.PORT;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,data");
  next();
});

const ecommerceRoutes = require("./routes/ecommerceRoutes");
const bdRoutes = require("./routes/bdRoutes");

app.use("/ecommerce", ecommerceRoutes);
app.use("/bd", bdRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
