const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Employee } = require("../models/index");
const { KDM_EMPLOYEE_TOKEN, KDM_ECOMMERCE_TOKEN } = require("../static/tokens");

const loginEmployee = async (req, res) => {
  const { username, password } = req.body;
  try {
    const employee = await Employee.findOne({ where: { username } });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      employee.hashed_password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password", employee });
    }
    const payload = {
      emp_id: employee.emp_id,
      access: employee.access_key,
    };
    const token = jwt.sign(payload, KDM_EMPLOYEE_TOKEN);
    delete employee.dataValues.hashed_password;

    res.status(200).json({ jwt_token: token, employee });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginEmployee,
};
