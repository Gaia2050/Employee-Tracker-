const inquirer =require('inquirer');
require('console.table');
const connection = require('./db/connection');

console.log('Welcome to employee tracker');
mainMenu();

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        message: 'Choose action',
        name: 'action',
        choices: [
            'view all Departments', 
            'view all Roles',
            'view all Employees', 
            'Add a Department',
            'Add a Role', 
            'Add an Employee', 
            'Update an employee role', 
            'quit'
        ]
    }).then(({action}) => {
        switch(action) {
            case 'view all Departments': viewDepartments(); break;
            case 'view all Roles': viewRoles(); break;  
            case 'view all Employees': viewEmployees(); break;
            case 'Add a Department': addDepartment(); break;
            case 'Add a Role': addRole(); break;
            case 'Add an Employee': addEmployee(); break;
            case 'Update an employee role': updateEmployeeRole(); break;
            case 'quit': 
                console.log('Thanks for using Employee Tracker');
                process.exit();
        }
    });
}

function viewDepartments() {
    console.log('view departments');
    const sql = 'SELECT * FROM department';
    connection.query(sql, (err, res)=> {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewRoles() {
    console.log('view roles');
    const sql = 'SELECT * FROM role';
    connection.query(sql, (err, res)=> {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewEmployees() {
    console.log('view employee');
    const sql = 'SELECT * FROM employee';
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}


//do this function for the rest of the bottom functions 
function addDepartment() {
    console.log('add department');
    inquirer.prompt({ 
        type: 'input',
        name: 'departmentName',
        message: 'Add a department name!'
    })
    .then( (answer)=> {
        console.log(answer);
        const sql = `
        INSERT INTO department(name)
    VALUES ('${answer.departmentName}');`
    connection.query(sql, (err, res) => {
        if (err) throw err; 
        console.table('Department added successfully!');
        mainMenu();
    });
    })
}

function addRole() {
    console.log('add role');
    connection.promise().query("SELECT * FROM Department")
    .then((res) => {
        // make the choice dept arr
        return res[0].map(dept => {
            return {
                name: dept.name,
                value: dept.id
            }
        })
    })
    .then((departments) => {

        return inquirer.prompt([

            {
                type: 'input',
                name: 'title',
                message: 'What is the title of this role?'
            },

            {
                type: 'input',
                name: 'salary',
                message: 'Please enter a salary:'
            },

            {
                type: 'list',
                name: 'department_id',
                choices: departments,
                message: 'Please select your department.'
            }
        ])
    })

    .then(answer => {
        console.log(answer);
        return connection.promise().query('INSERT INTO role SET ?', answer);
    })
    .then(res => {
        console.log('Added new role')
        mainMenu();

    })
    .catch(err => {
        throw err
    });

}
function selectRole() {
    return connection.promise().query("SELECT * FROM role")
        .then(res => {
            return res[0].map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        })
}

function selectManager() {
    return connection.promise().query("SELECT * FROM employee ")
        .then(res => {
            return res[0].map(manager => {
                return {
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id,
                }
            })
        })

}

async function addEmployee() {
    console.log('add employee');
    const managers = await selectManager();
    // managers.push({
    //     name: 'no manager',
    //     value: 'null'
    // })
    inquirer.prompt([
        {
            name: "first_name",
            message: "Enter their first name "
        },
        {
            name: "last_name",
            message: "Enter their last name "
        },
        {
            name: "role_id",
            type: "list",
            message: "What is their role? ",
            choices: await selectRole()
        },
        {
            name: "manager_id",
            type: "list",
            message: "Whats their managers name?",
            choices: managers
        }
    ]).then(function (res) {
        connection.query("INSERT INTO Employee SET ?",
        res, function (err) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            })

    })
}

function updateEmployeeRole() {
    connection.promise().query('SELECT *  FROM employee')
        .then((res) => {
            return res[0].map(employee => {
                return {
                    name: employee.first_name,
                    value: employee.id
                }
            })
        })
        .then(async (employeeList) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeListId',
                    choices: employeeList,
                    message: 'Please select the employee you want to update a role:.'
                },
                {
                    type: 'list',
                    name: 'roleId',
                    choices: await selectRole(),
                    message: 'Please select the role.'
                }
            ])
        })
        .then(answer => {
            console.log(answer);
            return connection.promise().query("UPDATE employee SET  role_id = ? WHERE id = ?",

                    [
                        answer.roleId,
                        answer.employeeListId,
                    ],


            );

        })
        .then(res => {
            // console.log(res);
            console.log('Updated Role Successfully')
            mainMenu();
        })

        .catch(err => {
            throw err
        });

}
