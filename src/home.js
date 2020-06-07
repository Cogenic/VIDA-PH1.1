require('./scss/style.scss');
require('./scss/opening-screen.scss');
require('./scss/home-screen.scss');
require('./images/Cogenic.png');
require('./images/welcome-screen.png');
require('./images/restrooms-logo.png')
require('./images/classrooms-logo.png')
require('./images/staff_info.png');
require('./images/vida-logo.png');
require('./images/homebutton.png');
require('./images/vida.gif');
const moment = require('moment');
import App from './App';
const vida = require('./ai.js');
const React = require('react');
const ReactDOM = require('react-dom');
const registerServiceWorker = require('./registerServiceWorker.js');
vida.showSlides();

ReactDOM.render(<App />, document.getElementById('root'));

/*
function GetFormattedDate() {
    var todayTime = new Date();
    var month = format(todayTime .getMonth() + 1);
    var day = format(todayTime .getDate());
    var year = format(todayTime .getFullYear());
    return month + "/" + day + "/" + year;
}

var dates=GetFormattedDate();
console.log(dates);
*/
var time_openingScreen = document.getElementById("time");
var date = moment().format('LLLL');
time_openingScreen.innerHTML = date;
