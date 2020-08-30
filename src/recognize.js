
  // [START speech_transcribe_infinite_streaming]

const fs = require('fs');

const chalk = require('chalk');
const {Writable} = require('stream');
const https = require('https');
const ws = require('ws').Server;
const httpsServer = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('bundle.crt'),
  //ca: fs.readFileSync('intermediate.crt')
});


httpsServer.listen(5000,() => console.log('Https running on port 5000'));

//    httpsServer.on('error', (err) => console.error(err));
const wss = new ws({
    server: httpsServer,
    path: '/echo'
});

httpsServer.on('request', (req, res) => {
  res.writeHead(200);
  res.end('hello HTTPS from recognize\n');
});




// Node-Record-lpcm16
const recorder = require('node-record-lpcm16');

// Imports the Google Cloud client library
// Currently, only v1p1beta1 contains result-end-time
const speech = require('@google-cloud/speech').v1p1beta1;
const s = require('../stream.js');

//    const client = new speech.SpeechClient();
let encoding = 'LINEAR16';
let sampleRateHertz = 48000;
let languageCode= 'en-US';
let streamingLimit= 290000;


const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
};

const request = {
    config,
    interimResults: true,
};

let restartCounter = 0;
let audioInput = [];
let lastAudioInput = [];
let resultEndTime = 0;
let isFinalEndTime = 0;
let finalRequestEndTime = 0;
let newStream = true;
let bridgingOffset = 0;
let lastTranscriptWasFinal = false;
const client = new speech.SpeechClient();
let recognizeStream = null;

wss.on('connection', function connection(ws) {
    console.log("connected to 5000!");
    startStream();
    ws.on('message', function message(data){
//            console.log(data);
        //if(data!=='{"sampleRate":48000}'){
        if(typeof data!=='string'){
//                console.log("lets goo");
            var buffer = new Int16Array(data, 0, Math.floor(data.byteLength / 2));
            if(recognizeStream !== null){
                audioInputStreamTransform(buffer,encoding);
            }
        }else{
          ws.send('Initilaized')
            console.log(data);
        }
    })
    ws.on('close', () => {
        console.log('socket closed');
    });


function startStream() {
    // Clear current audioInput
    audioInput = [];
    // Initiate (Reinitiate) a recognize stream
    recognizeStream = client.streamingRecognize(request)
        .on('error', err => {
        if (err.code === 11) {
//           restartStream();
        } else {
//              console.error('API request error ' + err);
        }
        })
            .on('data',speechCallback);

        // Restart stream when streamingLimit expires
        setTimeout(restartStream, streamingLimit);
}


function stopRecognitionStream() {
    if (recognizeStream) {
        recognizeStream.end();
    }
    recognizeStream = null;
}


function speechCallback(stream){
// Convert API result end time from seconds + nanoseconds to milliseconds
    resultEndTime =
      stream.results[0].resultEndTime.seconds * 1000 +
      Math.round(stream.results[0].resultEndTime.nanos / 1000000);

    // Calculate correct time based on offset from audio sent twice
    const correctedTime =
      resultEndTime - bridgingOffset + streamingLimit * restartCounter;

 //   process.stdout.clearLine();
//    process.stdout.cursorTo(0);
    let stdoutText = '';
    if (stream.results[0] && stream.results[0].alternatives[0]) {
          stdoutText =
            correctedTime + ': ' + stream.results[0].alternatives[0].transcript;
    }

    if (stream.results[0].isFinal) {
          process.stdout.write(chalk.green(`${stdoutText}\n`));
//            ws.send(stream.results[0].alternatives[0].transcript);
            preception(stream.results[0].alternatives[0].transcript);

          isFinalEndTime = resultEndTime;
          lastTranscriptWasFinal = true;
    }else{
          // Make sure transcript does not exceed console character length
          if (stdoutText.length > process.stdout.columns) {
            stdoutText =
              stdoutText.substring(0, process.stdout.columns - 4) + '...';
          }
 //         process.stdout.write(chalk.red(`${stdoutText}`));

          lastTranscriptWasFinal = false;
    }
}
function audioInputStreamTransform(chunk,encoding){
  if (newStream && lastAudioInput.length !== 0) {
    // Approximate math to calculate time of chunks
    const chunkTime = streamingLimit / lastAudioInput.length;
    if (chunkTime !== 0) {
      if (bridgingOffset < 0) {
        bridgingOffset = 0;
      }
      if (bridgingOffset > finalRequestEndTime) {
        bridgingOffset = finalRequestEndTime;
      }
      const chunksFromMS = Math.floor(
        (finalRequestEndTime - bridgingOffset) / chunkTime
      );
      bridgingOffset = Math.floor(
        (lastAudioInput.length - chunksFromMS) * chunkTime
      );

      for (let i = chunksFromMS; i < lastAudioInput.length; i++) {
        recognizeStream.write(lastAudioInput[i]);
      }
    }
    newStream = false;
  }

  audioInput.push(chunk);

  if (recognizeStream) {
    recognizeStream.write(chunk);
  }

}


function restartStream() {
    if (recognizeStream) {
      recognizeStream.removeListener('data', speechCallback);
      recognizeStream = null;
    }
    if (resultEndTime > 0) {
      finalRequestEndTime = isFinalEndTime;
    }
    resultEndTime = 0;
    lastAudioInput = [];
    lastAudioInput = audioInput;

    restartCounter++;

    if (!lastTranscriptWasFinal) {
      process.stdout.write('\n');
    }
    process.stdout.write(
      chalk.yellow(`${streamingLimit * restartCounter}: RESTARTING REQUEST\n`)
    );
    newStream = true;
    startStream();
}
    function preception(verbal,done){
        const db = require('../db');
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
                        ws.send(trigger);

                });
            });
    }
});
