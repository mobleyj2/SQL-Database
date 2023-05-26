const express = require('express');
const { response } = require('express');
const mysql = require('mysql2');
const inquirer= require('inquirer')
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '19Jake82!',
    database: 'STORES_db'
  },
  console.log(`Connected to the STORES_db database.`)
);
 function ValidEmployees(){
    inquirer
    .prompt({
      name:"action",
      type: "list",
      message: "Please List Tasks",
      choices:[
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Role"
      ]

    })
    .then (function(input){
      switch(input.action) {
        case "Add Department": AddDepartment(); break;
        case "Add Role": addRole(); break;
        case "Add Employee": AddEmployee(); break;
        case "View Departments": viewDepartments(); break;
        case "View Role": viewRole(); break;
        case "View Employees": viewEmployees(); break;
        case "Update Role": updateRole(); break;
      


      }
    });
 }
const AddDepartment =() => {
  inquirer
  .prompt({ 
    name:"NewDepartment", type: "input", message: "Enter name for new department",
    validate:(input) =>{
      if (!input) {return 'No accept an empty input';}
      return true;

    },
  })
  .then(responce =>{
    Connection.query("Insert into Department",
    {name: responce.newDepartment},
    (err,res) => {
      if (err) throw err;
      console.log(`${responce.newDepartment} Added succesfully.`);
      employeeRoster();
    }
    );
  });
};
const addRole =() =>{
  inquirer
  .prompt([
    {
    name:"roleTitle", type: "input", message:"enter title to be added",
      validate: (input) => {
        if (!input) {return 'empty input';}
        return true;
    },
  },
    {
      name:"roleSalary", type: "input", message:"enter Salary",
        validate: (input) => {
          if (!input) {return 'empty input';}
          return true;
  
        },
      },

       {
          name:"departmentId", type: "input", message:"enter Department Id",
            validate: (input) => {
              if (!input) {return 'empty input';}
              return true;
      
            },
          }
  ])
  .then(responce =>{
    connection.query("Insert into role",
    {
      title: responce.roleTitle,
      salary: parseInt(responce.roleSalary),
      department_id: parseInt(responce.department_id)
    },
    (err,res) => {
      if (err) throw err;
      console.log(`${responce.roleTitle} Added succesfully.`);
      employeeRoster();
    }
    );

  });
  const AddEmployee = () => {
    inquirer
    .prompt([
      {
        name: "firstName", type: "input", message: "Enter New Employee First Name",
        validate: (input) =>{
          if (!input) {return 'Empty Field'}
          return true;
        },
      },
      {
        name: "lastName", type: "input", message: "Enter New Employee Last Name",
        validate: (input) =>{
          if (!input) {return 'Empty Field'}
          return true;
        },
      },
        {
          name: "roleId", type: "input", message: "Enter New Employee First Name",
          validate: (input) =>{
            if (!input) {return 'Empty Field'}
            return true;
          },
        }
    ])
    .then(responce =>{
      connection.query("Insert into Employee set",
      {first_name: responce.firstName, last_name: responce.lastName, role_id: parseInt(responce.roleId)},
      (err,res) => {
        if (err) {
        console.log ('Invalid Id');
        AddEmployee();
        return;
      }
      console.log(`${response.firstName} ${response.firstName} has been added`);
      employeeRoster();
      });
    });
  };
const viewEmployees =() => {
  connection.query(`
  SELECT,
  Distinct (e.id),
  CONCAT (e.first_name,' ',e.last_name) AS employee_name,

  ORDER by e.id ASC LIMIT 100`
  , (err, res) => {
    if (err) throw err; 
    console.table(res);
    employeeRoster()
  })
  
};

const updateEmployeeRole = () => {
connection.query (`
SELECT id, first_name, last_name
FROM employee`,
(err, res) => {
  if (err) throw err;
  inquirer
  .prompt([
    {
  name: "employeeId",
  type: "input",
  message: "enter employee id to update role",
  validate: ( input ) => {
   if( !input) {return 'No Empty Fields';}
    return true;

},
    },
    {
      name: "updateRoleId",
      type: "input",
      message: "enter new department id",
      validate: ( input ) => {
       if( !input) {return 'No Empty Fields';}
        return true;
    
    },
        },

  ])
  .then(responce =>{
    let updateEmployeeRole =parseInt(response.employeeId);
    let updateRoleId= parseInt(response.updateEmployeeRole);
    connection.query(`UPDATE employee SET role_id =${updatedRoleId} WHERE id =${updatedEmployeeRole}`,
    (err,res) => {
      if (err) {
      console.log("Enter Valid ID");
      updateEmployeeRole();
      return;
    }
    console.log("Updated")
    employeeRoster();
  });
}

)


// Query database
db.query('SELECT * FROM departments_db', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
  })

    }}
