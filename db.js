var mysql = require('mysql')
var db_config = {
    host: 'localhost',
    user: 'Kirubel',
    password: 'aiAdvantage',
    database : 'login_info',
    port:'3305'
//    socketPath: '/cloudsql/cogenicintel:us-west4:reason'

}
var connection;

function handleDisconnect(){
    connection = mysql.createConnection(db_config);
    connection.connect(function(err){
        if(err){
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect,2000);
        }
    });
    connection.on('error', function(err){
        console.log('db error', err);
        if(err.code ==='PROTOCOL_CONNECTION_LOST'){
            handleDisconnect();
        } else {
            throw err;
        }
    });

    connection.query('SELECT 1 + 1 AS solution', function(error, results, fields){
            if(error) throw error;
            console.log*('success connection to sql');

    //        console.log('The solution is: ', results[0].solution);
        });
}

handleDisconnect();
module.exports = connection;
