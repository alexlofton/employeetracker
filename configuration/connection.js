const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db',
});

connection.connect((err, results) => {
    if (err) throw err;
    console.log('Schema created!');
});

module.exports = connection;