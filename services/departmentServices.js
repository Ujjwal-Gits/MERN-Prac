const Department = require("../models/Department");

const CreateDepartmentService = async (newDepartmentData) => {
  const newDepartment = new Department(newDepartmentData);
  await newDepartment.save();
  return newDepartment;
};

const GetAllDepartmentService = async () => {
  return await Department.find();
};

const GetDepartmentByIdService = async (id) => {
  return await Department.findById(id);
};

const UpdateDepartmentService = async (id, updateDepartmentData) => {
  const department = await Department.findByIdAndUpdate(id, updateDepartmentData, {
    new: true,
  });
  if (!department) {
    return "Department Not Found!";
  }
  return department;
};

const DeleteDepartmentService = async (id) => {
  const department = await Department.findByIdAndDelete(id);
  if (!department) {
    return "Department Not Found!";
  }
  return department;
};

const departmentExists = async (name) => {
  const department = await Department.findOne({ name });
  if (department) {
    return true;
  }
  return false;
};

module.exports = {
  CreateDepartmentService,
  GetAllDepartmentService,
  GetDepartmentByIdService,
  UpdateDepartmentService,
  DeleteDepartmentService,
  departmentExists,
};