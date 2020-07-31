var respond = require('./src/respond.js');
var error = "Unable to find trigger";
const ws = require('ws');
const http = require('http');
const app = require('express')();

let server = http.createServer(function(req, res){
res.writeHead(200);
//  res.end(index);
});
server.addListener('upgrade 2.0', (req, res, head) => console.log('TRAINING DATA 2.0', req.url));
server.on('error', (err) => console.error(err));
server.listen(8443, () => console.log('Https running on port 8443'));
const wss = new ws.Server({server, path: '/training'});


function preception(verbal,done){
    const db = require('./db');
    verbal = verbal.trim();
    var trigger = "";
    db.query('SELECT Triggers FROM verbalTriggers WHERE verbalTriggers = ?',[verbal],function(err, result, fields){
        if(!result){
        /*

            if(verbal !== "I do not understand"){
                respond("I do not understand", "unknown");
                wss.on('connection', function connection(ws) {
                    ws.send("unknown");
                })

            }
            */
           return err;
       }
            console.log(result);
//            trigger = result[0].Triggers;
             db.query('SELECT Utterance FROM trainingData WHERE triggers = ?',result[0].Triggers,function(err, result, fields){
                   if(result.length === 0)
                       return err;
                   console.log('#################');
                   respond(result[0].Utterance,trigger);
                    wss.on('connection', function connection(ws) {
                            ws.send(trigger);
                    })

            });
        });
}
 module.exports = preception;

