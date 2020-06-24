// Imports the Google Cloud client library
var response = require('../app.js');
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart(word,trigger) {
  // The text to synthesize
    var text = word;
    console.log(word);

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-GB', ssmlGender: 'FEMALE', voiceName:'en-GB-Wavenet-C' , voiceType:'WaveNet'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('./src/audio/' + trigger+".mp3", response.audioContent, 'binary');
  console.log('Audio content written to file: ' + trigger);
}
module.exports = quickStart;
//quickStart();
