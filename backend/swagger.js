const swaggerJsdoc = require('swagger-jsdoc');

const commonComponents = {
  components: {
    schemas: {
      DepartmentRecord: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          departmentname: { type: 'string', example: 'Engineering' },
          Managername: { type: 'string', example: 'Priya Nair' },
          manager: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                noofManager: { type: 'integer', example: 2 },
                developer: { type: 'integer', example: 12 },
                tester: { type: 'integer', example: 5 }
              }
            }
          }
        }
      },
      DepartmentRecordInputV1: {
        type: 'object',
        required: ['departmentname', 'Managername', 'manager'],
        properties: {
          departmentname: { type: 'string', example: 'Engineering' },
          Managername: { type: 'string', example: 'Priya Nair' },
          manager: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                noofManager: { type: 'integer', example: 2 },
                developer: { type: 'integer', example: 12 },
                tester: { type: 'integer', example: 5 }
              }
            }
          }
        }
      },
      DepartmentRecordInputV2: {
        type: 'object',
        required: ['departmentname', 'managerName', 'manager'],
        properties: {
          departmentname: { type: 'string', example: 'Engineering' },
          managerName: { type: 'string', example: 'Priya Nair' },
          manager: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                noofManager: { type: 'integer', example: 2 },
                developer: { type: 'integer', example: 12 },
                tester: { type: 'integer', example: 5 }
              }
            }
          }
        }
      }
    }
  }
};

function getSwaggerSpec({ version, title, apiFiles }) {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title,
        version,
        description: `ACAP API documentation for ${version}`
      },
      servers: [{ url: `http://localhost:3000/api/${version}` }],
      ...commonComponents
    },
    apis: apiFiles
  });
}

module.exports = { getSwaggerSpec };
