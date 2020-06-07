var express = require('express');
var trainer = express.Router();
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var passport = require('passport')

var bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
trainer.get('/', function(req, res){
//    console.log(req.user);
    //   console.log(req.isAuthenticated());//Test wheter or not data is being passed through
    res.render('trainer', {title: 'Trainer'});
});

trainer.post('/', function(req, res, next){
    const triggers = req.body.trigger;
 //   console.log(triggers);
    const response = req.body.response;
//    console.log(response);
    const db = require('../db.js');
        db.query('INSERT INTO preception (triggers, response) VALUES (?,?)'
            ,[triggers, response], function(
            error,results,fields){
                if(error) throw error;
               db.query('SELECT LAST_INSERT_ID() as trigger_id', function(error,results,fields){
                   if(error) throw error;
                   const user_id = results[0];
            });
    });
    res.render('trainer', { title: 'Trigger submitted' });
});






module.exports = trainer;
