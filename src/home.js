require('./scss/style.scss');
require('./scss/opening-screen.scss');
require('./scss/home-screen.scss');
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
require('./images/J4o.gif');
require('./images/AIbac.gif');
require('./audio/hello.mp3');
const moment = require('moment');

import App from './App';

const vida = require('./ai.js');
const React = require('react');
import Music from './Music.js';
const {Howl, Howler} = require('howler');
const ReactDOM = require('react-dom');

var socket = new WebSocket('ws://localhost:8443/training');

//requires the mp3 files inorder for VIDA to speak
socket.addEventListener('message', (e) =>{
    require(`./audio/${e.data}.mp3`);
})

ReactDOM.render(<App />, document.getElementById('visualizer'));

var time_openingScreen = document.getElementById("time");
var date = moment().format('LLLL');
time_openingScreen.innerHTML = date;

ReactDOM.render(<Music url="hello"/>, document.getElementById('music'));
