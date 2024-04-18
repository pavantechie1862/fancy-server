"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Cart = require("./Cart")(sequelize, Sequelize.DataTypes);
const Subscriber = require("./Subscribers")(sequelize, Sequelize.DataTypes);
const Callback = require("./Callbacks")(sequelize, Sequelize.DataTypes);
const Orders = require("./Orders")(sequelize, Sequelize.DataTypes);
const Product = require("./Product")(sequelize, Sequelize.DataTypes);
const Params = require("./Params")(sequelize, Sequelize.DataTypes);
const Employee = require("./Employee")(sequelize, Sequelize.DataTypes);
const Branch = require("./Branch")(sequelize, Sequelize.DataTypes);
const Department = require("./Department")(sequelize, Sequelize.DataTypes);
const Role = require("./Role")(sequelize, Sequelize.DataTypes);
const AccessKey = require("./AccessKeys")(sequelize, Sequelize.DataTypes);

module.exports = {
  User,
  db,
  sequelize,
  Sequelize,
  Cart,
  Subscriber,
  Callback,
  Orders,
  Product,
  Params,
  Employee,
  Branch,
  Department,
  Role,
  AccessKey,
};
