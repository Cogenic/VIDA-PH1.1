//var recognize = require('./src/recognize.js');
var respond = require('./src/respond.js');
var error = "Unable to find trigger";
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server)
/*
var express = require('express')
  , http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
*/
//...
server.listen(5000);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.hbs');
});

function preception(verbal,done){
    const db = require('./db');
    console.log("hi");
    verbal = verbal.trim();
    console.log(verbal)
    var trigger = "";
    db.query('SELECT Triggers FROM verbalTriggers WHERE verbalTriggers = ?',[verbal],function(err, result, fields){
        if(result.length === 0)
            return err;
            console.log(result);
            trigger = result[0].Triggers;
            db.query('SELECT Utterance FROM trainingData WHERE triggers = ?',result[0].Triggers,function(err, result, fields){
                   if(result.length === 0)
                       return err;
                   console.log(result[0].Utterance);
                   respond(result[0].Utterance,trigger);
                    // Play Audio
                    let sequenceNumberByClient = new Map();
                    io.on("connection", (socket) => {
                    console.info(`Client connected [id=${socket.id}]`);
                    // initialize this client's sequence number
                    sequenceNumberByClient.set(socket, 1);

                        io.emit("news", trigger);
                        // when socket disconnects, remove it from the list:
                        socket.on("disconnect", () => {
                            sequenceNumberByClient.delete(socket);
                            console.info(`Client gone [id=${socket.id}]`);
                        });
                    });

                    // sends each client its current sequence number
                    setInterval(() => {
                        for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
                            client.emit("seq-num", sequenceNumber);
                            sequenceNumberByClient.set(client, sequenceNumber + 1);
                        }
                    }, 1000);



//            player.play('foo.mp3', function(err){
 //             if (err) throw err
  //          })
            });
        });
}
 module.exports = preception;

