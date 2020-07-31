//This is potential useless
//imports
const ffmpeg = require('fluent-ffmpeg');
const {
    Transform
} = require('stream');
const fs = require('fs');
//google speech to text
const speech = require('@google-cloud/speech');
//creates a speech client
const speechClient = new speech.v1p1beta1.SpeechClient();
let recognizeStream, timeout;
let streamingLimit = 210000 //3.5 minutes
let configurations = {
    config: {
        encoding: 'FLAC',
        sampleRateHertz: 48000,
        languageCode: 'en-US',
        model: 'default',
        audioChannelCount: 2,
        enableWordTimeOffsets: true,
    },
    interimResults: true,
};
let out_write_size = {
    high: 160000,
    medium: 80000,
    low: 20000,
    very_low: 1024
};
//link to your m3u8 stream
//let livestream_endpoint = 'http://localhost:3001/opening-screen'
let audio_buffer = null;
const empty_buffer = Buffer.alloc(1, 0);
let isFirstProgress = true;

function startStream() {
    console.log("started recognition stream ");
    recognizeStream = speechClient
        .streamingRecognize(configurations)
        .on('error', (err) => {
            console.log(err);
        })
        .on('data', (stream) => {
            speechCallback(stream);
        });
    //restarting stream every 3.5 mins for infinite streaming
    timeout = setTimeout(restartStream, streamingLimit);
}

function speechCallback(stream, incoming_which_stream) {
    let stdoutText = stream.results[0].alternatives[0].transcript;
    if (stream.results[0] && stream.results[0].isFinal) {
        console.log("Final Result : ", stdoutText);
        fs.appendFile('transcripts.txt', stdoutText, (err) => {
            if (err)
                console.log(err);
        });
    } else {
        console.log("Interim Result : ", stdoutText);
    }
}

function restartStream() {
    if (recognizeStream) {
        recognizeStream.removeListener('data', speechCallback);
        recognizeStream.destroy();
        recognizeStream = null;
    }
}

let dest = new Transform({
    transform: (chunk, enc, next) => {
        if (!audio_buffer) {
            audio_buffer = chunk;
        } else {
            // append data to audio buffer
            audio_buffer = Buffer.concat([audio_buffer, chunk]);
        }
        console.log('chunk length: ', chunk.length);
        next(null, chunk);
    }
}).on('data', (data) => {});

function writeDataToRecognizeStream() {
    // select a size of data to be removed from buffer depending on current size of audio_buffer
    let write_size = audio_buffer ?
        (audio_buffer.length > 1280000 ? out_write_size.high :
            (audio_buffer.length > 640000 ? out_write_size.medium :
                (audio_buffer.length > 320000) ? out_write_size.low : out_write_size.very_low)) :
        out_write_size.very_low;

    if (audio_buffer && (audio_buffer.length >= write_size)) {
        if (recognizeStream) {
            // remove the chunks of selected size and write to recognizeStream
            let data_to_write = audio_buffer.slice(0, write_size);
            audio_buffer = audio_buffer.slice(write_size);
            recognizeStream.write(data_to_write);
        } else {
            console.log("no recognise stream");
        }
    } else {
        // no data coming from stream, write 0's into stream
        console.log("Nothing to write, buffer empty, writing dummy chunk");
        recognizeStream.write(empty_buffer);
    }
}

/*
// ffmpeg processing
let command = ffmpeg(livestream_endpoint)
    .on('start', () => {
        startStream();
        console.log("ffmpeg : processing Started");
    })
    .on('progress', (progress) => {
        if (isFirstProgress) {
            // write data into recognizeStream after every 1 second
            setInterval(writeDataToRecognizeStream, 1000);
        }
        isFirstProgress = false;
        console.log('ffmpeg : Processing: ' + progress.targetSize + '   KB converted');
    })
    .on('end', () => {
        console.log('ffmpeg : Processing finished !');
    })
    .on('error', (err) => {
        console.log('ffmpeg : ffmpeg error :' + err.message);
    })
    .format('flac')
    .audioCodec('flac')
    .output(dest)
command.run();
*/
startStream();
setInterval(writeDataToRecognizeStream, 1000);
