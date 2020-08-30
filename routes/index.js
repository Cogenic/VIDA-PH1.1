var express = require('express');
var router = express.Router();
var stream = require('../stream.js');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var passport = require('passport')

var bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', authenticationMiddleware(), function (req, res) {
    //   console.log(req.user);
    //    console.log(req.isAuthenticated());//Test wheter or not data is being passed through
    res.render('opening-screen', { title: 'Opening-screen' });
});
//do the authencitcation middleware

router.get('/hello-screen', authenticationMiddleware(), function (req, res) {
    res.render('hello-screen', { title: 'Welcome' });
});


router.post('/hello-screen', function (req, res, next) {
    res.redirect('/opening-screen');
});


router.post('/options-screen', function (req, res, next) {
    res.redirect('/options-screen');
});


router.get('/options-screen', authenticationMiddleware(), function (req, res) {
    res.render('options-screen', { title: 'home' });
});


router.get('/opening-screen', authenticationMiddleware(), function (req, res) {
    res.render('opening-screen', { title: 'Opening-screen' });
});


router.post('/opening-screen', function (req, res, next) {
    res.redirect('/opening-screen');
});

router.get('/option-restrooms', authenticationMiddleware(), function (req, res) {
    res.render('option-restrooms');
});

router.get('/option-rooms', authenticationMiddleware(), function (req, res) {
    res.render('option-rooms');
});

router.get('/option-amenities', authenticationMiddleware(), function (req, res) {
    res.render('option-amenities');
});


/*
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});
*/




//Since we are using a local database, the strategy we are going to deploy
//is 'Local'
router.get('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            // *** Display message without using flash option
            // re-render the login form with a message
            //        console.log(info);
            var message = req.flash('message')[0];
            //      req.session.message = message;
            return res.render('login', { message: message });
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + user.username);
        });

    })(req, res, next);

});




router.post('/login', passport.authenticate('local', {
    successRedirect: '/hello-screen',
    failureRedirect: '/login',
    failureFlash: 'true'
}),
);

router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
});



router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Registration' });
});



router.post('/register', function (req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(password);

    const errors = req.validationErrors();
    if (errors) {
        console.log(`errors: ${JSON.stringify(errors)}`);

        res.render('register', {
            title: 'Registration Error',
            errors: errors
        });
    } else {
        const db = require('../db.js');
        bcrypt.hash(password, saltRounds, function (err, hash) {
            db.query('INSERT INTO entries (username, email, password) VALUES (?,?,?)'
                , [username, email, hash], function (
                    error, results, fields) {
                if (error) throw error;

                db.query('SELECT LAST_INSERT_ID() as user_id', function (error, results, fields) {
                    if (error) throw error;

                    const user_id = results[0];
                    //                       console.log(user_id);
                    req.login(user_id, function (err) {
                        res.redirect('/');
                    })

                });
                //                res.render('register', { title: 'Registration Complete' });
            });
            //            res.render('register', { title: 'Welcome to cogenic' });
        });
    }
});

passport.serializeUser(function (user_id, done) {
    done(null, user_id);

});
passport.deserializeUser(function (user_id, done) {
    done(null, user_id);

});

function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`
            req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }
}


module.exports = router;
