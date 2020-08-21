var respond = require('./src/respond.js');
var error = "Unable to find trigger";
const ws = require('ws').Server;
const fs = require('fs');
const https = require('https');
const app = require('express')();

const httpsServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('bundle.crt'),
    requestCert: true,
    rejectUnauthorized: false,

});

httpsServer.listen(8443, () => console.log('Https running on port 8443'));
//httpsServer.on('error', (err) => console.error(err));
const wss = new ws({
    server: httpsServer,
    path: '/training'
});

httpsServer.on('request', (req, res) => {
  res.writeHead(200);
  res.end('hello HTTPS from streaming\n');
});


function preception(verbal,done){
    const db = require('./db');
    verbal = verbal.trim();
    var trigger = "";
    db.query('SELECT Triggers FROM verbalTriggers WHERE verbalTriggers = ?',[verbal],function(err, result, fields){
        if(result.length === 0){
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
            trigger = result[0].Triggers;
             db.query('SELECT Utterance FROM trainingData WHERE triggers = ?',result[0].Triggers,function(err, result, fields){
                   if(result.length === 0)
                       return err;
                   console.log('#################');
                   respond(result[0].Utterance,trigger);
                    wss.on('connection', function connection(ws) {
                        console.log('8443 connection');
                            ws.send(trigger);
                    })

            });
        });
}
 module.exports = preception;

