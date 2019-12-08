var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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
        "Update Roles",
        "Update Department",
        "View Employees By Department",
        "View total budget by department",
        "Delete Employee",
        "Delete Department",
        "Delete Roles"
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

//View all functions
viewAllEmployees = () => {

};
viewAllRoles = () => {

};
viewAllDepartments = () => {

};
viewBudget = () => {

};
viewByDepartment = () => {

};
//Add Functions
addEmployee = () => {

};
addRole = () => {

};
addDepartment = () => {

};
//Update Functions
updateEmployee = () => {

};
updateRole = () => {

};
updateDepartment = () => {

};
//Delete
deleteEmployee = () => {

};
deleteRoles = () => {

};
deleteDepartment = () => {

};

