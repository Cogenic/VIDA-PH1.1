var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Kirubel',
    password: 'aiAdvantage',
    database : 'login_info'
//    socketPath: '/cloudsql/cogenicintel:us-west4:reason'
})
connection.connect()

connection.query('SELECT 1 + 1 AS solution',
    function(error, results, fields){
        if(error) throw error;
        console.log*('success connection to sql');

//        console.log('The solution is: ', results[0].solution);
    });
module.exports = connection;
