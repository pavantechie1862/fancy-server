const {
  Role,
  Department,
  Branch,
  AccessKey,
  Employee,
} = require("../models/index");

const { KDM_EMPLOYEE_TOKEN } = require("../static/tokens");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();

    return res.status(200).json({ roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addRole = async (req, res) => {
  const { role, responsibilities, min_salary, department } = req.body;

  try {
    const newRole = await Role.create({
      role,
      responsibilities,
      min_salary,
      department,
    });

    res.status(201).json({ message: "Role added successfully", role: newRole });
  } catch (error) {
    console.error("Error adding role:", error);
    res.status(500).json({ message: "Failed to add role" });
  }
};

const editRole = async (req, res) => {
  const roleId = req.params.id;
  const { role, responsibilities, min_salary, department } = req.body;

  try {
    const existingRole = await Role.findByPk(roleId);
    if (!existingRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    await existingRole.update({
      role,
      responsibilities,
      min_salary,
      department,
    });

    res
      .status(200)
      .json({ message: "Role updated successfully", role: existingRole });
  } catch (error) {
    console.error("Error editing role:", error);
    res.status(500).json({ message: "Failed to edit role" });
  }
};

const deleteRole = async (req, res) => {
  const roleId = req.params.id;

  try {
    const existingRole = await Role.findByPk(roleId);
    if (!existingRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    await existingRole.destroy();

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Failed to delete role" });
  }
};

const getRoleById = async (req, res) => {
  const roleId = req.params.id;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ role });
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Failed to fetch role" });
  }
};

//branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();

    res.status(200).json({ branches });
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Failed to fetch branches" });
  }
};

const getBranchById = async (req, res) => {
  const branchId = req.params.id;

  try {
    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.status(200).json({ branch });
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ message: "Failed to fetch branch" });
  }
};

const addBranch = async (req, res) => {
  const { branch_id, branch, address } = req.body;

  try {
    const newBranch = await Branch.create({ branch_id, branch, address });
    res
      .status(201)
      .json({ message: "Branch added successfully", branch: newBranch });
  } catch (error) {
    console.error("Error adding branch:", error);
    res.status(500).json({ message: "Failed to add branch" });
  }
};

const editBranch = async (req, res) => {
  const branchId = req.params.id;
  const { branch, address } = req.body;

  try {
    const existingBranch = await Branch.findByPk(branchId);
    if (!existingBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    await existingBranch.update({ branch, address });

    res
      .status(200)
      .json({ message: "Branch updated successfully", branch: existingBranch });
  } catch (error) {
    console.error("Error editing branch:", error);
    res.status(500).json({ message: "Failed to edit branch" });
  }
};

const deleteBranch = async (req, res) => {
  const branchId = req.params.id;

  try {
    const existingBranch = await Branch.findByPk(branchId);
    if (!existingBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    await existingBranch.destroy();

    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ message: "Failed to delete branch" });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();

    res.status(200).json({ departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};

const getDepartmentById = async (req, res) => {
  const deptId = req.params.id;

  try {
    const department = await Department.findByPk(deptId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ department });
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ message: "Failed to fetch department" });
  }
};

const addDepartment = async (req, res) => {
  const { dept_id, department, additional_info } = req.body;

  try {
    const newDepartment = await Department.create({
      dept_id,
      department,
      additional_info,
    });
    res.status(201).json({
      message: "Department added successfully",
      department: newDepartment,
    });
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({ message: "Failed to add department" });
  }
};

const editDepartment = async (req, res) => {
  const deptId = req.params.id;
  const { department, additional_info } = req.body;

  try {
    const existingDepartment = await Department.findByPk(deptId);
    if (!existingDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    await existingDepartment.update({ department, additional_info });

    res.status(200).json({
      message: "Department updated successfully",
      department: existingDepartment,
    });
  } catch (error) {
    console.error("Error editing department:", error);
    res.status(500).json({ message: "Failed to edit department" });
  }
};

const deleteDepartment = async (req, res) => {
  const deptId = req.params.id;

  try {
    const existingDepartment = await Department.findByPk(deptId);
    if (!existingDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    await existingDepartment.destroy();

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ message: "Failed to delete department" });
  }
};

//access keys
const getAllAccessKeys = async (req, res) => {
  try {
    const accessKeys = await AccessKey.findAll();
    res.status(200).json({ accessKeys });
  } catch (error) {
    console.error("Error fetching access keys:", error);
    res.status(500).json({ message: "Failed to fetch access keys" });
  }
};

const addAccessKey = async (req, res) => {
  const { access_id, label, description } = req.body;

  try {
    const newAccessKey = await AccessKey.create({
      access_id,
      label,
      description,
    });
    res.status(201).json({
      message: "Access key added successfully",
      accessKey: newAccessKey,
    });
  } catch (error) {
    console.error("Error adding access key:", error);
    res.status(500).json({ message: "Failed to add access key" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

const addEmployee = async (req, res) => {
  const {
    emp_id,
    dob,
    firstname,
    lastname,
    phoneno,
    email,
    address,
    gender,
    spouse_name,
    spouse_contact,
    father_name,
    emergency_contact,
    blood,
    dept,
    role,
    doa,
    salary,
    branch,
    reportingTo,
    access_to,
    married,
    selectedGender,
  } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ where: { emp_id } });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    const username = "KDM" + emp_id;

    const hashedPassword = await bcrypt.hash(username, 10);

    const newEmployee = await Employee.create({
      emp_id,
      dob,
      first_name: firstname,
      last_name: lastname,
      phone_number: phoneno,
      email,
      address,
      gender,
      spouse_name,
      spouse_contact,
      father_name,
      emergency_contact,
      blood,
      dept,
      role,
      doa,
      salary,
      branch,
      gender: selectedGender,
      reporting_manager: reportingTo,
      access_key: access_to,
      username,
      married,
      hashed_password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessage });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Employee ID or username already exists" });
    }

    res
      .status(500)
      .json({ message: "Failed to add employee. Please try again later." });
  }
};

module.exports = {
  //roles
  getAllRoles,
  addRole,
  editRole,
  deleteRole,
  getRoleById,

  // Branches
  getAllBranches,
  getBranchById,
  addBranch,
  editBranch,
  deleteBranch,

  //departments
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  editDepartment,
  deleteDepartment,

  //access keys
  getAllAccessKeys,
  addAccessKey,

  //employee
  addEmployee,
  getAllEmployees,
};
