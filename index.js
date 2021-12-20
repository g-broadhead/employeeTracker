const inquirer = require('inquirer');
const { prompt } = require("inquirer");
const consoleTable = require('console.table');
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'rootroot',
  database: 'employeeTracker_db'
});

const start = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: "What would you like to do?",
      choices: ['Add Department(s)', 'Add Role(s)', 'Add Employee(s)', 'View Department(s)', 'View Role(s)', 'View Employee(s)', 'Update Employee Role(s)', 'Update Employee Manager(s)', 'View Employee(s) by Manager', 'Remove Department(s)', 'Remove Role(s)', 'Remove Employee(s)', 'View Total Utilized Budget', 'Leave'],
      name: 'todo'
    },
  ])
    .then((answers) => {
      switch (answers.todo) {
        case 'Add Department(s)':
          addDepartments();
          console.log(answers.todo)
          break;

        case 'Add Role(s)':
          addRoles();
          console.log(answers.todo)
          break;

        case 'Add Employee(s)':
          addEmployees();
          console.log(answers.todo)
          break;

        case 'View Department(s)':
          viewDepartments();
          console.log(answers.todo)
          break;

        case 'View Role(s)':
          viewRoles();
          console.log(answers.todo)
          break;

        case 'View Employees(s)':
          viewEmployees();
          console.log(answers.todo)
          break;

        case 'Update Employee Role(s)':
          // updateRoles();
          console.log(answers.todo)
          break;

        case 'Update Employee Manager(s)':
          // updateManagers();
          console.log(answers.todo)
          break;

        case 'View Employee(s) by Manager':
          // viewManagers();
          console.log(answers.todo)
          break;

        case 'Remove Department(s)':
          // removeDepartments();
          console.log(answers.todo)
          break;

        case 'Remove Roles(s)':
          // removeRoles();
          console.log(answers.todo)
          break;

        case 'Remove Employee(s)':
          // removeEmployees();
          console.log(answers.todo)
          break;

        case 'View Total Utilized Budget':
          // viewBudget();
          console.log(answers.todo)
          break;

        case 'Leave':
          // leave();
          console.log(answers.todo)
          break;

      }
    })
}

start()


// View Functions
function viewDepartments() {
  db.query('SELECT * FROM department', (err, department) => {
    if (err) { console.log(err) }
    console.table(department)
    start()
  })
}

function viewRoles() {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }
    console.table(roles)
    start()
  })
}

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    start()
  })
}

function viewManagers() {
  db.query('SELECT * FROM employee WHERE ? manager_id', (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    start()
  })
}

// Add Functions
function addDepartments() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name of new department.'
    }
  ])
    .then(newDepartment => {
      db.query('INSERT INTO department SET ?', newDepartment, err => {
        if (err) { console.log(err) }
        console.log(`${newDepartment} has been added!`)
        start()
      })
    })
}

function addRoles() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name of new role.'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the department ID?'
    },
    {
      type: 'input',
      name: 'salary',
      message: `What is the new role's salary?`
    }
  ])
    .then(newRole => {
      db.query('INSERT INTO roles SET ?', newRole, err => {
        if (err) { console.log(err) }
        console.log(`${newRole} has been added!`)
        start()
      })
    })
}

function addEmployees() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the FIRST name of the employee?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the LAST name of the employee?'
    },
    {
      type: 'list',
      name: 'roles_id',
      message: `What is the new employee's role ID?`
    }
  ])
    .then(newEmployee => {
      db.query('INSERT INTO employee SET ?', newEmployee, err => {
        if (err) { console.log(err) }
        console.log(`${newEmployee} has been added!`)
        start()
      })
    })
}
