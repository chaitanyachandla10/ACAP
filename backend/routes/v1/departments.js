const express = require('express');
const { createDepartment, getDepartments, isDatabaseReady, normalizeManagerAllocations } = require('../../db');
const demo = require('../../demo-data');
const router = express.Router();

function validateDepartment(req, res, next) {
  const departmentname = String(req.body.departmentname || '').trim();
  const managername = String(req.body.Managername ?? req.body.managername ?? '').trim();
  const manager = normalizeManagerAllocations(req.body.manager);
  const invalidAllocation = manager.some(item => [item.noofManager, item.developer, item.tester].some(value => value < 0 || value > 100));

  if (departmentname.length < 2 || managername.length < 2 || !manager.length || invalidAllocation) {
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Provide valid department, lead and allocation values.' });
  }
  req.department = { departmentname: departmentname.slice(0, 120), managername: managername.slice(0, 120), manager };
  next();
}

async function listDepartments(req, res, next) {
  try {
    const departments = isDatabaseReady() ? await getDepartments() : demo.departments;
    res.json(departments.length ? departments : demo.departments);
  } catch (error) { next(error); }
}

router.get('/departments', listDepartments);
router.get('/getdata', listDepartments);

router.post('/departments', validateDepartment, async (req, res, next) => {
  try {
    if (!isDatabaseReady()) return res.status(503).json({ code: 'DATABASE_UNAVAILABLE', message: 'Database is not available; no data was saved.' });
    const department = await createDepartment(req.department);
    res.status(201).json({ message: 'Department saved successfully', department });
  } catch (error) { next(error); }
});
router.post('/datasend', validateDepartment, async (req, res, next) => {
  try {
    if (!isDatabaseReady()) return res.status(503).json({ code: 'DATABASE_UNAVAILABLE', message: 'Database is not available; no data was saved.' });
    const department = await createDepartment(req.department);
    res.status(201).json({ message: 'Department saved successfully', department });
  } catch (error) { next(error); }
});

router.get('/employees', (_req, res) => res.json(demo.employees));
router.get('/managers', (_req, res) => res.json(demo.departments.flatMap(department => department.manager)));

module.exports = router;
