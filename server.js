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

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);