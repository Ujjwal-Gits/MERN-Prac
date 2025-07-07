const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const employeeServices = require('./services/employeeServices');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hrms_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('MongoDB connected for seeding');
    seedEmployees();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

let employeeCount = 0;
const totalEmployees = 50; // Target number of employees

const seedEmployees = () => {
  const employees = [];
  fs.createReadStream('employees.csv')
    .pipe(csv())
    .on('data', (data) => {
      employees.push(data);
    })
    .on('end', async () => {
      try {
        for (const data of employees) {
          const employeeData = {
            name: data.name,
            email: data.email,
            role: data.role,
            isActive: data.isActive === 'true', // Convert string 'true'/'false' to boolean
            departmentId: data.departmentId, // Store as string, should match existing Department _id
          };
          const newEmployee = await employeeServices.CreateEmployeeService(employeeData);
          employeeCount++;
          console.log(`Created employee ${employeeCount}: ${newEmployee.name}`);
        }
        console.log(`Employee seeding completed. Created ${employeeCount} employees.`);
      } catch (err) {
        console.error('Error during seeding:', err.message);
      } finally {
        mongoose.connection.close();
      }
    });
};