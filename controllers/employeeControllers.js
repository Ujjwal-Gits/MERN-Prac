const employeeServices = require("../services/employeeServices");

const CreateEmployeeController = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ message: "Missing Error" });
  }
  try {
    const newEmployee = await employeeServices.CreateEmployeeService(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

const GetAllEmployeeController = async (req, res) => {
  try {
    const allEmployee = await employeeServices.GetAllEmployeeService();
    res.status(201).json(allEmployee);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const GetEmployeeByIdController = async (req, res) => {
  try {
    const employee = await employeeServices.GetEmployeeByIdService(
      req.params.id
    );
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const UpdateEmployeeController = async (req, res) => {
  try {
    const updatedEmployee = await employeeServices.UpdateEmployeeService(
      req.params.id,
      req.body
    );
    res.status(201).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const DeleteEmployeeController = async (req, res) => {
  try {
    const deletedEmployee = await employeeServices.DeleteEmployeeService(
      req.params.id
    );
    res.status(201).json(deletedEmployee);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  CreateEmployeeController,
  GetAllEmployeeController,
  GetEmployeeByIdController,
  UpdateEmployeeController,
  DeleteEmployeeController,
};
