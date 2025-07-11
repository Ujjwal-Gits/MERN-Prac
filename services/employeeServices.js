const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendLoginCredentials = require("../utils/mailer");
const generateTempPassword = require("../utils/generateTempPassword");

const CreateEmployeeService = async (newUserData) => {
  let newEmployee;
  try {
    // Step 1: Create Employee
    newEmployee = new Employee(newUserData);
    await newEmployee.save();
  } catch (err) {
    console.error("Failed to create employee:", err.message);
    throw new Error("Employee creation failed: " + err.message);
  }

  // Step 2: Generate random temp password
  const tempPassword = generateTempPassword(); // returns string like 'a9vks3j2'

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(tempPassword, 10);
  } catch (err) {
    console.error("Failed to hash password:", err.message);
    throw new Error("Password hashing failed");
  }

  // Step 3: Create linked User
  const newUser = new User({
    name: newUserData.name,
    email: newUserData.email,
    password: hashedPassword,
    role: "employee",
    employeeId: newEmployee._id,
  });

  try {
    console.log("Creating user...");
    await newUser.save();
    console.log("User created successfully.");
    console.log("sending email to user");
    await sendLoginCredentials(newUser.email, tempPassword);
  } catch (err) {
    console.log(err);
    console.error("Failed to create user:", err.message);

    // Optionally rollback the employee if user creation fails
    await Employee.findByIdAndDelete(newEmployee._id);
    console.warn("Rolled back employee record due to user creation failure.");

    throw new Error("User creation failed: " + err.message);
  }

  // Step 4: Return both
  return {
    success: true,
    employee: newEmployee,
    userInfo: {
      email: newUser.email,
      tempPassword,
    },
  };
};

module.exports = {
  CreateEmployeeService,
};
