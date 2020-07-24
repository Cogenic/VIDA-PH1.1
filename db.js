var mysql = require('mysql')
var connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    socketPath: '/cloudsql/cogenic:us-west2:cogenic-sql-1'

})

connection.connect()

connection.query('SELECT 1 + 1 AS solution',
    function(error, results, fields){
        if(error) throw error;
//        console.log('The solution is: ', results[0].solution);
    });
module.exports = connection;
