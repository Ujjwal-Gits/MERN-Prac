const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const employeeControllers = require("../controllers/employeeControllers");

const auth = require("../middleware/auth");
const roleAccess = require("../middleware/role");
// GET all
router.get("/", auth, employeeControllers.GetAllEmployeeController);
// GET by ID
router.get("/:id", auth, employeeControllers.GetEmployeeByIdController);

router.post(
  "/",
  roleAccess("admin"),
  employeeControllers.CreateEmployeeController
);
// POST new employee
router.post("/", employeeControllers.CreateEmployeeController);
// UPDATE existing employee
router.put("/:id", employeeControllers.UpdateEmployeeController);
// DELETE existing employee
router.delete("/:id", employeeControllers.DeleteEmployeeController);

module.exports = router;
