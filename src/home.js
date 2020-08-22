require('./scss/style.scss');
require('./scss/login.scss');
require('./scss/hello-screen.scss');
require('./scss/opening-screen.scss');
require('./scss/options-screen.scss');
require('./scss/option-restrooms.scss');
require('./scss/option-amenities.scss');
require('./scss/option-rooms.scss');
require('./scss/training.scss');
require('./images/Cogenic.png');
require('./images/welcome-screen.png');
require('./images/restrooms-logo.png')
require('./images/classrooms-logo.png')
require('./images/staff_info.png');
require('./images/vida-logo.png');
require('./images/homebutton.png');
require('./images/vida.gif');
require('./images/vida2.gif');
require('./images/Listen.gif');
require('./images/talk.gif');
require('./images/J4o.gif');
require('./images/AIbac.gif');
require('./audio/hello.mp3');
require('./images/option_amenities.png');
require('./images/option_restroom.png');
require('./images/option_room.png');
require('./images/vida-circle.png');
require('./images/amenities-background.png');
require('./images/city-room.png');
require('./images/terrace-room.png');
require('./images/skyvilla-room.png');
require('./images/map.png');
require('./images/map-casino.png');
require('./images/map-second.png');
require('./images/map-third.png');
const moment = require('moment');

import App from './App';

const vida = require('./ai.js');
const openingScreen = require('./openingScreen');
const React = require('react');
import Music from './Music.js';
import Play from './play.js';
const { Howl, Howler } = require('howler');
const ReactDOM = require('react-dom');
ReactDOM.render(<App />, document.getElementById('visualizer'));
ReactDOM.render(<Play />, document.getElementById('play-sound'));

var time_openingScreen = document.getElementById("time");
var date = moment().format('LLLL');
time_openingScreen.innerHTML = date;
var socket = new WebSocket('wss://localhost:8443/training');
//                  console.log(values[1].target);
// If the socket is closed for whatever reason, pause the mic
socket.addEventListener('close', function(e) {
    console.log('Websocket closing..');
});
socket.addEventListener('error', function(e) {
    console.log('Error from websocket', e);
});
socket.onopen = function (event) {
  socket.send("Here's some text that the server is urgently awaiting!");
};

socket.addEventListener('message', function(e) {
    socket.addEventListener('message', function(e) {
        console.log(e.data);
    })
})





//ReactDOM.render(<Music url="hello" />, document.getElementById('music'));
