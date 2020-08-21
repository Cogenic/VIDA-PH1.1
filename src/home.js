require('./scss/style.scss');
require('./scss/login.scss');
require('./scss/hello-screen.scss');
require('./scss/opening-screen.scss');
require('./scss/options-screen.scss');
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
const moment = require('moment');

import App from './App';

const vida = require('./ai.js');
const openingScreen = require('./openingScreen');
const React = require('react');
import Music from './Music.js';
const { Howl, Howler } = require('howler');
const ReactDOM = require('react-dom');

var socket = new WebSocket('wss://dev1.cogenicintel.com/training');
//var socket = new WebSocket('ws://localhost:8443/training');

socket.onopen = function(event){
    console.log('connected');

}

//requires the mp3 files inorder for VIDA to speak
socket.addEventListener('message', (e) => {
    require(`./audio/${e.data}.mp3`);
})

ReactDOM.render(<App />, document.getElementById('visualizer'));

var time_openingScreen = document.getElementById("time");
var date = moment().format('LLLL');
time_openingScreen.innerHTML = date;

ReactDOM.render(<Music url="hello" />, document.getElementById('music'));
