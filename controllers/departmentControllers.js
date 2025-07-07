const departmentServices = require("../services/departmentServices");

const createDepartment = async (req, res) => {
  try {
    const { name, description, managerId } = req.body;
    const existing = await departmentServices.departmentExists(name);
    if (existing) {
      return res.status(400).json({ message: "Department already exists." });
    }
    const department = await departmentServices.CreateDepartmentService(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentServices.GetAllDepartmentService();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await departmentServices.GetDepartmentByIdService(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const department = await departmentServices.UpdateDepartmentService(req.params.id, req.body);
    if (department === "Department Not Found!") return res.status(404).json({ message: department });
    res.json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await departmentServices.DeleteDepartmentService(req.params.id);
    if (department === "Department Not Found!") return res.status(404).json({ message: department });
    res.status(200).json({ message: "Department deleted", department });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};