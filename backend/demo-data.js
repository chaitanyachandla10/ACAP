const departments = [
  { id: 1, departmentname: 'Product & Engineering', Managername: 'Priya Nair', manager: [{ noofManager: 2, developer: 18, tester: 6 }] },
  { id: 2, departmentname: 'Customer Experience', Managername: 'Arjun Mehta', manager: [{ noofManager: 1, developer: 7, tester: 4 }] },
  { id: 3, departmentname: 'People Operations', Managername: 'Neha Kapoor', manager: [{ noofManager: 1, developer: 4, tester: 2 }] }
];

const employees = [
  { id: 1048, name: 'Aisha Sharma', title: 'Senior Product Designer', department: 'Product & Engineering', status: 'Active', email: 'aisha@acap.io', location: 'Bengaluru' },
  { id: 1047, name: 'Rohan Patel', title: 'Frontend Engineer', department: 'Product & Engineering', status: 'Remote', email: 'rohan@acap.io', location: 'Pune' },
  { id: 1046, name: 'Sana Verma', title: 'People Partner', department: 'People Operations', status: 'On Leave', email: 'sana@acap.io', location: 'Mumbai' },
  { id: 1045, name: 'Kabir Singh', title: 'QA Lead', department: 'Product & Engineering', status: 'Active', email: 'kabir@acap.io', location: 'Hyderabad' },
  { id: 1044, name: 'Mira Joshi', title: 'Customer Success Manager', department: 'Customer Experience', status: 'Active', email: 'mira@acap.io', location: 'Delhi' },
  { id: 1043, name: 'Dev Malhotra', title: 'Platform Engineer', department: 'Product & Engineering', status: 'Remote', email: 'dev@acap.io', location: 'Chennai' }
];

module.exports = { departments, employees };
