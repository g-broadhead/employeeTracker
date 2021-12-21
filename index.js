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
      choices: ['Add Department(s)', 'Add Role(s)', 'Add Employee(s)', 'View Department(s)', 'View Role(s)', 'View Employee(s)', 'Update Employee Role(s)', 'Remove Department(s)', 'Remove Role(s)', 'Remove Employee(s)', 'Leave'],
      name: 'todo'
    },
  ])
    .then((answers) => {
      switch (answers.todo) {
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

        case 'View Employee(s)':
          viewEmployees();
          break;

        case 'Update Employee Role(s)':
          updateRoles();
          break;

        // case 'Update Employee Manager(s)':
        //   // updateManagers();
        //   break;

        // case 'View Employee(s) by Manager':
        //   viewManagers();
        //   break;

        case 'Remove Department(s)':
          removeDepartment();
          break;

        case 'Remove Role(s)':
          removeRoles();
          break;

        case 'Remove Employee(s)':
          removeEmployees();
          break;

        // case 'View Total Utilized Budget':
        //   // viewBudget();
        //   break;

        case 'Leave':
          leave();
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
      db.query('INSERT INTO department SET name= ?', newDepartment.name, err => {
        if (err) { console.log(err) }
        console.log(`${newDepartment.name} has been added!`)
        start()
      })
    })
}

function addRoles() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
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
        console.log(`${newRole.title} has been added!`)
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
      type: 'input',
      name: 'roles_id',
      message: `What is the new employee's role ID?`
    },
    {
      type: 'number',
      name: 'manager_id',
      message: `Assign Manager ID.`
    }
  ])
    .then(newEmployee => {
      db.query('INSERT INTO employee SET ?', newEmployee, err => {
        if (err) { console.log(err) }
        console.log(`${newEmployee.first_name} ${newEmployee.last_name} has been added!`)
        start()
      })
    })
}

// Update Functions
function updateRoles() {
  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    console.log("-----------------------------------------------")
    db.query('SELECT * FROM roles', (err, roles) => {
      if (err) { console.log(err) }
      console.table(roles)
      inquirer.prompt([
        {
          type: 'input',
          message: 'What is the ID of the employee?',
          name: 'id'
        },
        {
          type: 'input',
          message: 'What is the new Role ID for the employee',
          name: 'roles_id'
        }
      ])
        .then(updateEmployee => {
          db.query('UPDATE employee SET ? WHERE ?', [{ roles_id: updateEmployee.roles_id }, { id: updateEmployee.id }], () => {
            console.log('The employee role has been updated.')
            start()
          })
        })
    })
  })
}

// Remove Functions
function removeDepartment() {
  db.query('SELECT * FROM department', (err, department) => {
    if (err) { console.log(err) }
    console.table(department)
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter NAME of department that needs to be removed.'
      }
    ])
      .then(removeDept => {
        db.query('DELETE FROM department WHERE ?', removeDept, err => {
          if (err) { console.log(err) }
          console.log(`Department has been removed!`)
          start()
        })
      })
  })
}

function removeRoles() {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }
    console.table(roles)
    inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter Role ID of role that needs to be removed.'
      }
    ])
      .then(removeRole => {
        db.query('DELETE FROM roles WHERE ?', removeRole, err => {
          if (err) { console.log(err) }
          console.log(`Role has been removed!`)
          start()
        })
      })
  })
}

function removeEmployees() {
  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter Employee ID of employee that needs to be removed.'
      }
    ])
      .then(removeEmp => {
        db.query('DELETE FROM employee WHERE ?', removeEmp, err => {
          if (err) { console.log(err) }
          console.log(`Employee has been removed!`)
          start()
        })
      })
  })
}


// End Process Function
function leave() {
  console.log('Process Ended')
  setTimeout((function () {
    return process.exit(20);
  }), 1000);
} 