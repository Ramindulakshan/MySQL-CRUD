const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employee_db',
    // multipleStatements: true
})

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : '+ JOSN.stringify(err, undefined, 2));
});

app.listen(3000,()=> console.log('Express server is running at port no : 3000'));

app.get('/employees', (req,res)=>{
    mysqlConnection.query('SELECT * FROM employees',(err, rows, fields)=>{
        if(!err)
            // console.log(rows);
        res.send(rows);
        else
        console.log(err);
    })
});

//Get an employees
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employees WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

// Insert an employee
app.post('/employees', (req, res) => {
    let emp = req.body;
    let sql = "INSERT INTO employees (EmpName, EmpPosition, EmpSalary) VALUES (?, ?, ?)";
    mysqlConnection.query(sql, [emp.EmpName, emp.EmpPosition, emp.EmpSalary], (err, result) => {
        if (!err)
            res.send('Inserted successfully');
        else
            console.log(err);
    });
});

//Delete an employees
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employees WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else
        console.log(err);
    })
});

// Update an employee
app.put('/employees/:id', (req, res) => {
    let emp = req.body;
    let sql = "UPDATE employees SET EmpName = ?, EmpPosition = ?, EmpSalary = ? WHERE EmpID = ?";
    mysqlConnection.query(sql, [emp.EmpName, emp.EmpPosition, emp.EmpSalary, req.params.id], (err, result) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});
