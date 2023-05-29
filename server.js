
const mysql = require('mysql2');
const inquirer= require('inquirer')





// Connect to database
const connection = mysql.createConnection(
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
ValidEmployees()
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
        name: "roleId", type: "input", message: "Enter New Employee Role Id",
        validate: (input) =>{
          if (!input) {return 'Empty Field'}
          return true;
        },
      }
  ])
  .then(response =>{
    connection.query("Insert into Employee set ?",
    {first_name: response.firstName, last_name: response.lastName, role_id: parseInt(response.roleId)},
    (err,res) => {
      console.log(err)
      if (err) {
      console.log ('Invalid Id');
      AddEmployee();
      return;
    }
    console.log(`${response.firstName} ${response.lastName} has been added`);
    ValidEmployees();
    });
  });
};
const viewEmployees =() => {
  connection.query(`SELECT * FROM employee`
  
   ,(err, res) => {
    if (err) throw err; 
    console.table(res);
    ValidEmployees()
  })

  
};

const AddDepartment =() => {
  inquirer
  .prompt({ 
    name:"newDepartment", type: "input", message: "Enter name for new department?",
    validate:(input) =>{
      if (!input) {return 'No accept an empty input';}
      return true;

    },
  })
  .then(response =>{
    connection.query("Insert into department set ?",
    {name: response.newDepartment},
    (err,res) => {
      if (err) throw err;
      console.log(`${response.newDepartment} Added succesfully.`);
      ValidEmployees();
    }
    );
  });
};
const viewDepartments =() => {
  connection.query(`SELECT * FROM department`
  
   ,(err, res) => {
    if (err) throw err; 
    console.table(res);
    ValidEmployees()
  })
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
  .then(response =>{
    connection.query("Insert into role set ?",
    {
      title: response.roleTitle,
      salary: parseInt(response.roleSalary),
      department_id: parseInt(response.departmentId)
    },
    (err,res) => {
      if (err) throw err;
      console.log(`${response.roleTitle} Added succesfully.`);
      ValidEmployees();
    }
    
    );
    

  });

};

const viewRole =() => {
  connection.query(`SELECT * FROM role`
  
   ,(err, res) => {
    if (err) throw err; 
    console.table(res);
    ValidEmployees()
  });
  
};
const updateRole = () => {
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
    .then(response =>{
      let updateEmployeeRole =parseInt(response.employeeId);
      let updateRoleId= parseInt(response.updateRoleId);
      connection.query(`UPDATE employee SET role_id =${updateRoleId} WHERE id =${updateEmployeeRole}`,
      (err,res) => {
        if (err) {
          console.log(err)
        console.log("Enter Valid ID");
        updateRole();
        return;
        
        
      }
      
      
      
      console.log("Updated")
      ValidEmployees();

      
    });
    
  }
  
  )
  
  })
  
      }
      
 