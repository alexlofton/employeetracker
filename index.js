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

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "new_department",
            message: "please enter department name",
        }
    ]).then(data => {
        connect.query("insert into department set ?", {
            name: data.new_department
        })
        console.log("New Department Added.")
        startApp()
    })
};


function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "new_role",
            message: "please enter role title",
        },
        {
            type: "input",
            name: "new_salary",
            message: "please enter salary amount",
        },
        {
            type: "input",
            name: "new_id",
            message: "please enter a department id for this roll (#1-5)",
        },


    ]).then(data => {
        connect.query("insert into role set ?", {
            title: data.new_role,
            salary: data.new_salary,
            department_id: data.new_id
        })
        console.log("New Role Added.")
        startApp()
    })
};

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "please enter employee first name",
        },
        {
            type: "input",
            name: "last_name",
            message: "please enter employee last name",
        },
        {
            type: "input",
            name: "new_role_id",
            message: "please enter employee roll id (choose # 1-5)",
        },
        {
            type: "input",
            name: "new_manager_id",
            message: "please enter manager id",
        },


    ]).then(data => {
        
        connect.query("insert into employee set ?", {
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: data.new_role_id,
            manager_id: data.new_manager_id
        })
        console.log("New Employee Added.")
        startApp()
    })
};

function employeeUpdate() {
    connect.query("select * from employee", (err, res) => {
        inquirer.prompt([
            {
                type: "list",
                name: "select_employee",
                message: "which employee would you like to update?",
                choices: res.map(employee => employee.first_name + " " + employee.last_name)//
            }
        ]).then(data => {
    const chosenEmployee = res.find(employee => employee.first_name + " " + employee.last_name === data.select_employee )
            connect.query("select * from role", (err, res) => {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "select_role",
                        message: "new role for chosen employee",
                        choices: res.map(role => role.title)
                    }
                ]).then(data => {
                let chosenRole = res.find(role => role.title === data.select_role)
                    connect.query("update employee set role_id = ? where id = ?", [chosenRole.id, chosenEmployee.id])
                    console.log("Employee role updated!")
                    startApp()
                })
            })
        })
    })
}


    startApp();