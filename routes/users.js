const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const passport = require("passport");
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.route('/register')
    //this route renders the register form for a user
    .get(users.renderRegister)
    //this route does the actual logic for registering a user
    .post(catchAsync(users.register))

router.route('/login')
    //this route renders the login form
    .get(users.renderLogin)
    //this route does the actual login logic
    .post(
        storeReturnTo,
        passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
         users.login)

//this route is what handles the logouts of users
router.get('/logout', users.logout);

module.exports = router;