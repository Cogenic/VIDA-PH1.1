require("babel-polyfill");
import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { hot } from 'react-hot-loader/root';
const ReactDOM = require('react-dom');

class Music extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            url: this.props.url,
            audioHash:Date.now(),
            time: new Date().toLocaleString(),
        }

    }


    getData = (e) => {
        this.setState({ url: e.data });
    };

    componentDidMount(){
        const SAMPLE_RATE = 16000;
        const SAMPLE_SIZE = 16;
        var analyser;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var scriptProcessor, myStream;
        var context = new AudioContext();
        var audioPromise = navigator.mediaDevices.getUserMedia(
            {
            audio: {
                echoCancellation: true,
                channelCount: 1,
                sampleRate: {
                  ideal: SAMPLE_RATE
                },
                sampleSize: SAMPLE_SIZE
            },
        })
        audioPromise.then(function(micStream) {
          var microphone = context.createMediaStreamSource(micStream);
          analyser = context.createAnalyser();
          microphone.connect(analyser);
        }).catch(console.log.bind(console));
        initWebsocket(audioPromise);
          function initWebsocket(audioPromise) {
            var socket;
            var sourceNode;

            // Create a node that sends raw bytes across the websocket
            var scriptNode = context.createScriptProcessor(4096, 1, 1);
            // Need the maximum value for 16-bit signed samples, to convert from float.
            const MAX_INT = Math.pow(2, 16 - 1) - 1;
            scriptNode.addEventListener('audioprocess', function(e) {
              var floatSamples = e.inputBuffer.getChannelData(0);
              // The samples are floats in range [-1, 1]. Convert to 16-bit signed
              // integer.

              if (socket && socket.readyState === socket.OPEN){
                  socket.send(Int16Array.from(floatSamples.map(function(n) {
                    return n * MAX_INT;
                  })));
                }
            });
              newWebsocket();

            function newWebsocket() {
              var websocketPromise = new Promise(function(resolve, reject) {
                var socket = new WebSocket('wss://localhost:5000/echo');
                socket.addEventListener('open', resolve);
                socket.addEventListener('error', reject);
              });

              Promise.all([audioPromise, websocketPromise]).then(function(values) {
                var micStream = values[0];
                socket = values[1].target;
//                  console.log(values[1].target);

                // If the socket is closed for whatever reason, pause the mic
                socket.addEventListener('close', function(e) {
                  console.log('Websocket closing..');
                });
                socket.addEventListener('error', function(e) {
                  console.log('Error from websocket', e);
                });

                function startByteStream(e) {
                  // Hook up the scriptNode to the mic
                  sourceNode = context.createMediaStreamSource(micStream);
                  sourceNode.connect(scriptNode);
                  scriptNode.connect(context.destination);
                }

                // Send the initial configuration message. When the server acknowledges
                // it, start streaming the audio bytes to the server and listening for
                // transcriptions.
                socket.addEventListener('message', function(e) {
                  startByteStream(e);
                }, {once: true});

                    socket.send(JSON.stringify({sampleRate: context.sampleRate}));


              }).catch(console.log.bind(console));
            }
            function closeWebsocket() {
              scriptNode.disconnect();
              if (sourceNode) sourceNode.disconnect();
              if (socket && socket.readyState === socket.OPEN) socket.close();
            }

        }
        var socket = new WebSocket('wss://localhost:8443/training');
        socket.addEventListener('message', this.getData);


    }
     tick() {
        this.setState({
          time: new Date().toLocaleString()
        });
    }
    render(){
        return (
           <div>
            <ReactAudioPlayer
                src={`/audio/${this.state.url}.mp3?${this.audioHash}`}
//                muted={false}
                autoPlay
           />
            </div>
        );

    }
}


export default Music;
