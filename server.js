const inquirer = require("inquirer");
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',

    password: 'PiggyBank@2023',
    database: 'company_db'
  }
);

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Company Database.");

  startingPrompt();
});

const startQuestion = {
  type: "list",
  message: "Select Option: ",
  name: "start",
  choices: [
    "View Departments", 
    "View Roles", 
    "View Employees",
    "Add Department",
    "Add Role",
    "Add Employee",
    "Update Employee Role",
    "End"
  ]
};

function startingPrompt() {
  inquirer.prompt(startQuestion).then(function(startAnswer) {
    switch (startAnswer.start) {
      case "View Departments":
          viewDepartment();
        return;
      case "View Roles":
          viewRoles();
        return;
      case "View Employees":
          viewEmployees();
        return;
      case "Add Department":
        addDepartment();
        return;
      case "Add Role":
        addRole();
        return;
      case "Add Employee":
        addEmployee();
        return;
      case "Update Employee Role":
        updateEmployee();
        return;
      case "End":
        endDatabase();
        return;


      default:
        console.log("Stop");
        return;
    }
  });
}

function viewDepartment() {
  console.log("Departments");
  db.query('SELECT dept_name AS Department FROM department', function (err, results) {
    console.table(results);
    startingPrompt();
  });
}

function viewRoles() {
  console.log("Roles");
  db.query(`SELECT company_role.role_title, company_role.role_salary, department.dept_name
    FROM company_role
    INNER JOIN department ON company_role.dept_id=department.dept_id`, function (err, results) {
      console.table(results);
      startingPrompt();
  });
}

function viewEmployees() {
  console.log("Employees");
  db.query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Employee, 
  company_role.role_title, 
  CONCAT(manager.last_name, ", " , manager.first_name) AS Manager
  FROM employee
  LEFT JOIN employee manager ON employee.manager_id = manager.employee_id
  INNER JOIN company_role ON employee.role_id=company_role.role_id;`, function (err, results) {
    console.table(results);
    startingPrompt();
  });
}

function addDepartment() {
  console.log("Add Department");

  const addDeptQuestions = [
    {
      type: "input",
      message: "Depatment Name: ",
      name: "deptNameAnswer",
    }
  ];

  inquirer.prompt(addDeptQuestions).then(function(addDeptAnswers) {
    db.query(`INSERT INTO department(dept_name)
    VALUES(?)`, (addDeptAnswers.deptNameAnswer), function (err, results) {

      console.log(`${addDeptAnswers.deptNameAnswer} Deparment Added`);
      startingPrompt();
    });
  });
}

function addRole() {
  console.log("Add Role");
  db.query('SELECT dept_id, dept_name FROM department', (err, results) => {
    if (err) {
      console.error('Error retrieving data from table:', err);
      db.end();
      return;
    }
  
    const deptChoices = results.map(row => ({
      name: row.dept_name,
      value: row.dept_id
    }));
  
    const addRoleQuestions = [
      {
        type: "input",
        message: "Role Title: ",
        name: "roleTitleAnswer",
      },
      {
        type: "input",
        message: "Role Salary: ",
        name: "roleSalaryAnswer",
      },
      {
        type: 'list',
        name: 'roleDeptAnswer',
        message: 'Select a departmnet for the role:',
        choices: deptChoices
      }
    ];
    
    inquirer.prompt(addRoleQuestions).then(function(addRoleAnswers) {
      db.query(`INSERT INTO company_role(role_title, role_salary, dept_id)
      VALUES(?, ?, ?)`, [addRoleAnswers.roleTitleAnswer, addRoleAnswers.roleSalaryAnswer, addRoleAnswers.roleDeptAnswer], function (err, results) {
  
        console.log("Role Added");
        startingPrompt();
      });
    });
  });
}

function addEmployee() {
  console.log("Add Employee");
  db.query('SELECT role_id, role_title FROM company_role', (err, results) => {
    if (err) {
      console.error('Error retrieving data from table:', err);
      db.end();
      return;
    }
  
    const roleChoices = results.map(row => ({
      name: row.role_title,
      value: row.role_id
    }));

    const addEmployeeQuestions = [
      {
        type: "input",
        message: "Employee ID: ",
        name: "employeeIDAnswer",
      },
      {
        type: "input",
        message: "First Name: ",
        name: "firstNameAnswer",
      },
      {
        type: "input",
        message: "Last Name: ",
        name: "lastNameAnswer",
      },
      {
        type: 'list',
        name: 'employeeRoleAnswer',
        message: 'Select a role for employee:',
        choices: roleChoices
      }
    ];
    
    inquirer.prompt(addEmployeeQuestions).then(function(addEmployeeAnswers) {
      db.query(`INSERT INTO employee(employee_id, first_name, last_name, role_id)
      VALUES(?, ?, ?, ?)`, [addEmployeeAnswers.employeeIDAnswer, addEmployeeAnswers.firstNameAnswer, addEmployeeAnswers.lastNameAnswer, addEmployeeAnswers.employeeRoleAnswer], function (err, results) {
  
        db.query(`SELECT employee.employee_id,
        CONCAT(employee.first_name, " ", employee.last_name) AS Employee, 
        CONCAT(manager.last_name, ", " , manager.first_name) AS Manager
        FROM employee
        LEFT JOIN employee manager ON employee.manager_id = manager.employee_id;`, (err, results) => {
          if (err) {
            console.error('Error retrieving data from table:', err);
            db.end();
            return;
          }
        
          const managerChoices = results.map(row => ({
            name: row.Employee,
            value: row.employee_id
          }));

          const nullManager = {name:"No Manager", value:null};

          managerChoices.push(nullManager);
      
          const addManagerQuestions = [
            {
              type: 'list',
              name: 'employeeManagerAnswer',
              message: 'Select a manager for employee:',
              choices: managerChoices
            }
          ];
          
          const selectedEmployeer = addEmployeeAnswers.employeeIDAnswer;

          inquirer.prompt(addManagerQuestions).then(function(addManagerAnswers) {

            const selectedManager = addManagerAnswers.employeeManagerAnswer;

            db.query(`UPDATE employee
            SET manager_id = ?
            WHERE employee_id = ?`, [selectedManager, selectedEmployeer], function (err, results) {
        
              console.log("Employee Added");
              console.log(selectedEmployeer);
              console.log(selectedManager);
              console.log(managerChoices);
              startingPrompt();
            });
          });
        });

      });
    });
  });
}

function updateEmployee() {
  console.log("Update Employee Role");

  db.query(`SELECT employee.employee_id,
  CONCAT(employee.first_name, " ", employee.last_name) AS Employee
  FROM employee;`, (err, results) => {
    if (err) {
      console.error('Error retrieving data from table:', err);
      db.end();
      return;
    }
  
    const updateSelEmpChoice = results.map(row => ({
      name: row.Employee,
      value: row.employee_id
    }));

    const updateSelEmpQuestion = [
      {
        type: 'list',
        name: 'updateSelEmpAnswer',
        message: 'Select a employee to update role:',
        choices: updateSelEmpChoice
      }
    ];
    
    inquirer.prompt(updateSelEmpQuestion).then(function(updateSelEmpAnswer) {
      db.query('SELECT role_id, role_title FROM company_role', (err, results) => {
        if (err) {
          console.error('Error retrieving data from table:', err);
          db.end();
          return;
        }

        const updateRoleChoices = results.map(row => ({
          name: row.role_title,
          value: row.role_id
        }));
    
        const updateRoleQuestions = [
          {
            type: 'list',
            name: 'updateRoleAnswer',
            message: 'Select a role:',
            choices: updateRoleChoices
          }
        ];
        
        const selectedUpdateEmployeer = updateSelEmpAnswer.updateSelEmpAnswer;

        inquirer.prompt(updateRoleQuestions).then(function(updateEmployeeAnswers) {

          const selectedUpdateRole = updateEmployeeAnswers.updateRoleAnswer;

          db.query(`UPDATE employee
          SET role_id = ?
          WHERE employee_id = ?`, [selectedUpdateRole, selectedUpdateEmployeer], function (err, results) {
      
            console.log("Employee Role Updated");
            startingPrompt();
          });
        });
        
      });
    });
  });
}

function endDatabase() {
  console.error('Exiting Database');
  db.end();
}