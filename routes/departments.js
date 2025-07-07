const express = require("express");
const router = express.Router();
const departmentControllers = require("../controllers/departmentControllers");

// GET all
router.get("/", departmentControllers.getAllDepartments);
// GET by ID
router.get("/:id", departmentControllers.getDepartmentById);
// POST new department
router.post("/", departmentControllers.createDepartment);
// UPDATE existing department
router.put("/:id", departmentControllers.updateDepartment);
// DELETE existing department
router.delete("/:id", departmentControllers.deleteDepartment);

module.exports = router;