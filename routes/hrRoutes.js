const express = require("express");

const {
  getAllBranches,
  getAllDepartments,
  getAllRoles,
  getAllAccessKeys,
  addEmployee,
  getAllEmployees,
} = require("../controllers/hrControllers");

const router = express.Router();

router.get("/get-roles", getAllRoles);
router.get("/get-employees", getAllEmployees);
router.get("/get-branch", getAllBranches);
router.get("/get-departments", getAllDepartments);
router.get("/get-accesskeys", getAllAccessKeys);
router.post("/register-employee", addEmployee);

module.exports = router;
