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
          // addDepartments();
          console.log(answers.todo)
          break;

        case 'Add Role(s)':
          // addRoles();
          console.log(answers.todo)
          break;

        case 'Add Employee(s)':
          // addEmployees();
          console.log(answers.todo)
          break;

        case 'View Department(s)':
          // viewDepartments();
          console.log(answers.todo)
          break;

        case 'View Role(s)':
          // viewRoles();
          console.log(answers.todo)
          break;

        case 'View Employees(s)':
          // viewEmployees();
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

start();