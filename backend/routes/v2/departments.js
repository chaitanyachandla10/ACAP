const express = require('express');
const { createDepartment, getDepartments } = require('../../db');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Latest department operations (v2)
 */

/**
 * @swagger
 * /api/v2/departments:
 *   get:
 *     summary: Get all department records with API version metadata
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: Department list with metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiVersion:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DepartmentRecord'
 *       500:
 *         description: Server error
 */
router.get('/departments', async (req, res) => {
  try {
    const departments = await getDepartments();
    res.status(200).json({ apiVersion: 'v2', data: departments });
  } catch (error) {
    console.error('Failed to fetch departments', error);
    res.status(500).json({ message: 'Unable to fetch department data' });
  }
});

/**
 * @swagger
 * /api/v2/departments:
 *   post:
 *     summary: Create a new department record using v2 payload format
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepartmentRecordInputV2'
 *     responses:
 *       201:
 *         description: Department created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiVersion:
 *                   type: string
 *                 message:
 *                   type: string
 *                 department:
 *                   $ref: '#/components/schemas/DepartmentRecord'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/departments', async (req, res) => {
  try {
    const departmentname = String(req.body.departmentname || '').trim();
    const managername = String(req.body.managerName || req.body.Managername || '').trim();
    const manager = Array.isArray(req.body.manager) ? req.body.manager : [];

    if (!departmentname || !managername) {
      return res.status(400).json({ message: 'Department name and manager name are required' });
    }

    const department = await createDepartment({ departmentname, managername, manager });

    res.status(201).json({ apiVersion: 'v2', message: 'Department saved successfully', department });
  } catch (error) {
    console.error('Failed to save department', error);
    res.status(500).json({ message: 'Unable to save department' });
  }
});

module.exports = router;
