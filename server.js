var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cance164",
  database: "employeeTracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runPrompt();
});

function runPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee",
        // "Update Roles",
        // "Update Department",
        // "View Employees By Department",
        // "View total budget by department",
        "Delete Employee"
        // "Delete Department",
        // "Delete Roles"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Update Roles":
          updateRole();
          break;

        case "Update Department":
          updateDepartment();
          break;

        case "View Employees By Department":
          viewByDepartment();
          break;

        case "View total budget by department":
          viewBudget();
          break;

        case "Delete Employee":
          deleteEmployee();
          break;

        case "Delete Department":
          deleteDepartment();
          break;

        case "Delete Roles":
          deleteRoles();
          break;
      }
    });
}

exitApp = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Exit app?",
      choices: ["Yes", "No, I have more to do"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Yes":
          connection.end();
          break;
        case "No, I have more to do":
          runPrompt();
          break;
      }
    });
};

//View all functions
viewAllEmployees = () => {
  let query =
    "select e.id, e.first_name, e.last_name, r.title, r.salary, d.name from employees e INNER JOIN roles r on e.role_id = r.id inner join departments d on r.department_id = d.id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    if (res.length == 0) {
      console.log(
        "No employees found. Please start adding employees by following the prompts."
      );
      runPrompt();
    }
    console.log("Employees found: " + res.length);
    console.table("All Employees: ", res);
    exitApp();
  });
};
viewAllRoles = () => {
  let query = "select * from roles";
  connection.query(query, function(err, res) {
    if (err) throw err;
    if (res.length == 0) {
      console.log(
        "No roles found. Please start adding roles by following the prompts."
      );
      runPrompt();
    }
    console.log("Roles found: " + res.length);
    console.table("All Roles: ", res);
    exitApp();
  });
};
viewAllDepartments = () => {
  let query = "select * from departments";
  connection.query(query, function(err, res) {
    if (err) throw err;
    if (res.length == 0) {
      console.log(
        "No departments found. Please start adding departments by following the prompts."
      );
      runPrompt();
    }
    console.log("Roles found: " + res.length);
    console.table("All Roles: ", res);
    exitApp();
  });
};
//Add Functions
addEmployee = () => {
  let queryString = "SELECT r.id AS roleId, r.title FROM roles r";
  connection.query(queryString, function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Employee first name"
        },
        {
          name: "last_name",
          type: "input",
          message: "Employee last name: "
        },
        {
          name: "role",
          type: "rawlist",
          choices: function() {
            let roles = [];
            for (let i = 0; i < res.length; i++) {
              roles.push(res[i].title);
            }
            return roles;
          },
          message: "Choose role: "
        }
      ])
      .then(function(answers) {
        let rId;
        for (let j = 0; j < res.length; j++) {
          if (res[j].title === answers.role) {
            rId = res[j].roleId;
            console.log(res[j].roleId);
          }
        }

        connection.query(
          "insert into employees set ?",
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: rId
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee added!\n");
            exitApp();
          }
        );
      });
  });
};
addRole = () => {
  let queryString = "SELECT d.name, d.id AS deptId FROM departments d";
  connection.query(queryString, function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "role_name",
          type: "input",
          message: "Role name: "
        },
        {
          name: "salary",
          type: "input",
          message: "Salary: "
        },
        {
          name: "department",
          type: "rawlist",
          choices: function() {
            let departments = [];
            for (let i = 0; i < res.length; i++) {
              departments.push(res[i].name);
            }
            return departments;
          },
          message: "Choose department: "
        }
      ])
      .then(function(answers) {
        let dId;
        for (let j = 0; j < res.length; j++) {
          if (res[j].name === answers.department) {
            dId = res[j].deptId;
          }
        }

        connection.query(
          "insert into roles set ?",
          {
            title: answers.role_name,
            salary: answers.salary,
            department_id: dId
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role added!\n");
            exitApp();
          }
        );
      });
  });
};
addDepartment = () => {
  let queryString = "SELECT d.name, d.id AS deptId FROM departments d";
  connection.query(queryString, function(err, res) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "department_name",
        type: "input",
        message: "Department name: "
      })
      .then(function(answers) {
        connection.query(
          "insert into departments set ?",
          {
            name: answers.department_name
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department added!\n");
            exitApp();
          }
        );
      });
  });
};
//Update Functions
updateEmployee = () => {
  let queryString = "SELECT * FROM roles r, employees e WHERE r.id = e.role_id";
  connection.query(queryString, function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "emp_name",
          type: "rawlist",
          message: "Which employee would you like to update the role for?",
          choices: function() {
            let employees = [];
            for (let i = 0; i < res.length; i++) {
              employees.push(res[i].first_name + " " + res[i].last_name);
            }
            return employees;
          }
        },
        {
          name: "updated_role",
          type: "rawlist",
          message: "Please assign new role:",
          choices: function() {
            let roles = [];
            for (let i = 0; i < res.length; i++) {
              roles.push(res[i].title);
            }
            return roles;
          }
        }
      ])
      .then(function(answers) {
        let newRole;
        for (let j = 0; j < res.length; j++) {
          if ((res[j].title = answers.updated_role)) {
            newRole = res[j].role_id;
          }
        }
        let newEmployeeArray = answers.emp_name.split(" ");
        let first = newEmployeeArray[0];
        let last = newEmployeeArray[1];
        let query = "UPDATE employees SET ? WHERE ? AND ?";
        connection.query(
          query,
          [
            {
              role_id: newRole
            },
            {
              first_name: first
            },
            {
              last_name: last
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Employee Updated!\n");
            viewAllEmployees();
            exitApp();
          }
        );
      });
  });
};
// //Delete
deleteEmployee = () => {
  let queryString =
    "SELECT e.first_name, e.last_name, e.id AS empID FROM employees e";
  connection.query(queryString, function(err, res) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "remove_emp",
        type: "rawlist",
        choices: function() {
          console.log(res);
          let employees = [];
          for (let i = 0; i < res.length; i++) {
            employees.push(res[i].first_name);
          }
          return employees;
        },
        message: "Which Employee would you like to remove: "
      })
      .then(function(answers) {
        let eId;
        console.log(eId);
        for (let j = 0; j < res.length; j++) {
          if (res[j].first_name === answers.remove_emp) {
            eId = res[j].empID;
          }
        }
        connection.query(
          "DELETE FROM employees WHERE ?",
          {
            id: eId
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee removed!\n");
            exitApp();
          }
        );
      });
  });
};
