const connect = require("./configuration/connection");
const inquirer = require("inquirer");


function startApp() {
    inquirer.prompt([
    {
    name: "prompt",
    type: "list",
    message: "What action do you want?",
    choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a new department",
    "Add a new role",
    "Add a new employee",
    "Update employee roles",
    "Exit"
    ]
    }])
    .then(function (response) {
    switch (response.prompt) {
    case "View all departments":
    viewDepartments();
    break;
    case "View all roles":
    viewRoles();
    break;
    case "View all employees":
    viewEmployees();
    break;
    case "Add a new department":
    addDepartment();
    break;
    case "Add a new role":
    addRole();
    break;
    case "Add a new employee":
    addEmployee();
    break;
    case "Update employee roles":
    employeeUpdate();
    break;
    case "Exit":
    connection.end();
    break;
    }
    });
    };




    function viewDepartments(){
        connect.query("select * from department", (err, res) => {
            if(err) throw err;
            console.table(res);
            startApp();
        });
    };


    function viewRoles(){
        connect.query("select * from role", (err, res) => {
            if(err) throw err;
            console.table(res);
            startApp();
        });
    };

    function viewEmployees(){
        connect.query("select * from employee", (err, res) => {
            if(err) throw err;
            console.table(res);
            startApp();
        });
    };



    startApp();