const mysql = require('mysql2');
require('dotenv').config();   //ACCESS'S ENV FILE BELOW PROCESSES IT 

const db = mysql.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD

    },
    // ()=> console.log('Connected to Employee Tracker database')
);

module.exports = db; 