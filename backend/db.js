const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/acap';

const pool = new Pool({
  connectionString
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    departmentname TEXT NOT NULL,
    managername TEXT NOT NULL,
    manager JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

async function initializeDatabase() {
  await pool.query(createTableQuery);
}

function normalizeManagerAllocations(manager) {
  if (!Array.isArray(manager)) {
    return [];
  }

  return manager.map((allocation) => ({
    noofManager: Number(allocation.noofManager) || 0,
    developer: Number(allocation.developer) || 0,
    tester: Number(allocation.tester) || 0
  }));
}

function mapDepartmentRow(row) {
  return {
    id: row.id,
    departmentname: row.departmentname,
    Managername: row.managername,
    manager: normalizeManagerAllocations(row.manager)
  };
}

async function createDepartment({ departmentname, managername, manager }) {
  const normalizedManager = normalizeManagerAllocations(manager);

  const result = await pool.query(
    `
      INSERT INTO departments (departmentname, managername, manager, updated_at)
      VALUES ($1, $2, $3::jsonb, NOW())
      RETURNING id, departmentname, managername, manager;
    `,
    [departmentname, managername, JSON.stringify(normalizedManager)]
  );

  return mapDepartmentRow(result.rows[0]);
}

async function getDepartments() {
  const result = await pool.query(
    `
      SELECT id, departmentname, managername, manager
      FROM departments
      ORDER BY id DESC;
    `
  );

  return result.rows.map(mapDepartmentRow);
}

module.exports = {
  pool,
  initializeDatabase,
  createDepartment,
  getDepartments
};
