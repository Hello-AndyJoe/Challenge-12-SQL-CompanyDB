const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    // Leaving Password out until I can adjust it
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to Company Database.`)
);

db.query('SELECT * FROM department', function (err, results) {
  console.table(results);
});

db.query('SELECT * FROM company_role', function (err, results) {
  console.table(results);
});

db.query('SELECT * FROM employee', function (err, results) {
  console.table(results);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);