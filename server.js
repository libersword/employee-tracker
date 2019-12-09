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
  let query = "select e.id, e.first_name, e.last_name, r.title, r.salary, d.name from employees e INNER JOIN roles r on e.role_id = r.id inner join departments d on r.department_id = d.id";
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
  });
};
viewBudget = () => {};
viewByDepartment = () => {};
//Add Functions
addEmployee = () => {
  let queryString = 'SELECT r.id AS roleId, r.title FROM roles r';
  connection.query(queryString, function(err, res){
    if(err) throw err;
    inquirer.prompt([
  {
    name: 'first_name',
    type: 'input',
    message: 'Employee first name'
  },{
    name: 'last_name',
    type: 'input',
    message: 'Employee last name: '
  }, {
    name: 'role',
    type:'rawlist',
    choices: function() {
      let roles = [];
      for (let i = 0; i < res.length; i++){
        roles.push(res[i].title)
      }
      return roles;
    },
    message: "Choose role: "
  }
    ]).then(function(answers){
      let rId;
      for (let j = 0; j < res.length; j++) {
        if (res[j].title === answers.role) {
          rId = res[j].roleId;
          console.log(res[j].roleId);
        }
      }
  
      connection.query('insert into employees set ?',
      {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: rId
      },
      function(err, res){
        if (err) throw err;
        console.log(res.affectedRows + " employee added!\n");
      }
      )
    })
  })
}
addRole = () => {
  let queryString = 'SELECT d.name, d.id AS deptId FROM departments d';
  connection.query(queryString, function(err, res){
    if(err) throw err;
    inquirer.prompt([
  {
    name: 'role_name',
    type: 'input',
    message: 'Role name: '
  },{
    name: 'salary',
    type: 'input',
    message: 'Salary: '
  }, {
    name: 'department',
    type:'rawlist',
    choices: function() {
      let departments = [];
      for (let i = 0; i < res.length; i++){
        departments.push(res[i].name)
      }
      return departments;
    },
    message: "Choose department: "
  }
    ]).then(function(answers){
      let dId;
      for (let j = 0; j < res.length; j++) {
        if (res[j].name === answers.department) {
          dId = res[j].deptId;
        }
      }
  
      connection.query('insert into roles set ?',
      {
        title: answers.role_name,
        salary: answers.salary,
        department_id: dId
      },
      function(err, res){
        if (err) throw err;
        console.log(res.affectedRows + " role added!\n");
      }
      )
    })
  })
};
addDepartment = () => {
  let queryString = 'SELECT d.name, d.id AS deptId FROM departments d';
  connection.query(queryString, function(err, res){
    if(err) throw err;
    inquirer.prompt(
      {
    name: 'department_name',
    type: 'input',
    message: 'Department name: '
  }).then(function(answers){
      connection.query('insert into departments set ?',
      {
        name: answers.department_name
      },
      function(err, res){
        if (err) throw err;
        console.log(res.affectedRows + " department added!\n");
      }
      )
    })
  })
};
//Update Functions
updateEmployee = () => {
  let queryString = 'SELECT e.first_name, e.last_name, role_id AS roleID FROM employees e INNER JOIN roles r ON e.role_id = r.id';
  connection.query(queryString, function(err, res){
    if(err) throw err;
    inquirer.prompt([
    {
    name: 'emp_name',
    type: 'rawlist',
    choices: function() {
      console.log(res);
      let employees = [];
      for (let i = 0; i < res.length; i++){
        employees.push(res[i].first_name + ' ' + res[i].last_name)
      }
      return employees;
    },
    message: "Choose employee to update: "
  },
  {
    name: 'updated_first',
    type: 'input',
    message: 'Update first name'
  },
  {
    name: 'updated_last',
    type: 'input',
    message: 'Update last name: ' 
  }]).then(function(answers){
    let query = "UPDATE employees SET ? WHERE ?";
    connection.query(query, {
      first_name: answers.updated_first,
      last_name: answers.updated_last,
    },{
      first_name: answers.emp_name
    },
    function(err, res){
      if (err) throw err;
      console.log(res.affectedRows + " Employee Updated!\n");
    }
    )
  })
})
};   

// updateRole = () => {};
// updateDepartment = () => {};
// //Delete
deleteEmployee = () => {
  let queryString = 'SELECT e.first_name, e.last_name, e.id AS empID FROM employees e';
  connection.query(queryString, function(err, res){
    if(err) throw err;
    inquirer.prompt(
    {
    name: 'remove_emp',
    type: 'rawlist',
    choices: function() {
      console.log(res);
      let employees = [];
      for (let i = 0; i < res.length; i++){
        employees.push(res[i].first_name)
      }
      return employees;
    },
    message: 'Which Employee would you like to remove: '
  }).then(function(answers){
    let eId;
    console.log(eId);
      for (let j = 0; j < res.length; j++) {
        if (res[j].first_name === answers.remove_emp) {
          eId = res[j].empID;
        }
      }
      connection.query('DELETE FROM employees WHERE ?',
      {
        id: eId
      },
      function(err, res){
        if (err) throw err;
        console.log(res.affectedRows + " employee removed!\n");
      }
      )
    })
  })
};
// deleteRoles = () => {

// };
// deleteDepartment = () => {

// };
