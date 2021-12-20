const mysql = require('mysql2')
const inquirer = require('inquirer');
const { prompt } = require("inquirer");
const consoleTable = require('console.table');
const AddEntriesFromIterable = require('es-abstract/2019/AddEntriesFromIterable');
const { allowedNodeEnvironmentFlags } = require('process');
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
      name: 'todo',
      message: "What would you like to do?"
    choices: ['Add Department(s)', 'Add Role(s)', 'Add Employee(s)', 'View Department(s)', 'View Role(s)', 'View Employee(s)', 'Update Employee Role(s)', 'Update Employee Manager(s)', 'View Employee(s) by Manager', 'Remove Department(s)', 'Remove Role(s)', 'Remove Employee(s)', 'View Total Untilized Budget of Department(s)' 'Leave']
    },
  ])
    .then(({ answers }) => {
      switch (answers) {
        case 'Add Department(s)':
          addDepartments();
          break;

        case 'Add Role(s)':
          addRoles();
          break;

        case 'Add Employee(s)':
          addEmployees();
          break;

        case 'View Department(s)':
          viewDepartments();
          break;

        case 'View Role(s)':
          viewRoles();
          break;

        case 'View Employees(s)':
          viewEmployees();
          break;

        case 'Update Employee Role(s)':
          updateRoles();
          break;

        case 'Update Employee Manager(s)':
          updateManagers();
          break;

        case 'View Employee(s) by Manager':
          viewManagers();
          break;

        case 'Remove Department(s)':
          removeDepartments();
          break;

        case 'Remove Department(s)':
          removeDepartments();
          break;

      }

    }

    )