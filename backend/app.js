const express = require("express");
const {
  initializeDatabase,
  createDepartment,
  getDepartments
} = require('./db');
const app = express();

initializeDatabase()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('PostgreSQL initialization error', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/datasend", async (req, res) => {
  try {
    const departmentname = String(req.body.departmentname || '').trim();
    const managername = String(req.body.Managername ?? req.body.managername ?? '').trim();

    if (!departmentname || !managername) {
      return res.status(400).json({
        message: 'Department name and manager name are required'
      });
    }

    const department = await createDepartment({
      departmentname,
      managername,
      manager: req.body.manager
    });

    res.status(201).json({
      message: 'Department saved successfully',
      department
    });
  } catch (error) {
    console.error('Failed to save department', error);
    res.status(500).json({
      message: 'Unable to save department'
    });
  }
});

app.get("/getdata", async (req, res) => {
  try {
    const departments = await getDepartments();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Failed to fetch departments', error);
    res.status(500).json({
      message: 'Unable to fetch department data'
    });
  }
});

module.exports = app;
