const express = require('express');
const { createDepartment, getDepartments } = require('../../db');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Legacy department operations (v1)
 */

/**
 * @swagger
 * /api/v1/getdata:
 *   get:
 *     summary: Get all department records
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: List of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DepartmentRecord'
 *       500:
 *         description: Server error
 */
router.get('/getdata', async (req, res) => {
  try {
    const departments = await getDepartments();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Failed to fetch departments', error);
    res.status(500).json({ message: 'Unable to fetch department data' });
  }
});

/**
 * @swagger
 * /api/v1/datasend:
 *   post:
 *     summary: Save department data
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepartmentRecordInputV1'
 *     responses:
 *       201:
 *         description: Department created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 department:
 *                   $ref: '#/components/schemas/DepartmentRecord'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/datasend', async (req, res) => {
  try {
    const departmentname = String(req.body.departmentname || '').trim();
    const managername = String(req.body.Managername ?? req.body.managername ?? '').trim();

    if (!departmentname || !managername) {
      return res.status(400).json({ message: 'Department name and manager name are required' });
    }

    const department = await createDepartment({
      departmentname,
      managername,
      manager: req.body.manager
    });

    res.status(201).json({ message: 'Department saved successfully', department });
  } catch (error) {
    console.error('Failed to save department', error);
    res.status(500).json({ message: 'Unable to save department' });
  }
});

module.exports = router;
