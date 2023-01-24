const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require("../models/User.model");


//This is the routes to create the user! :)
router.get('/createuser',isLoggedOut, (req, res) => {

    data = {userInSession:req.session.currentUser}
    
    res.render('auth/createUser',data)
})

router.post('/createuser', (req, res, next) => {
    const { email, password, username } = req.body
    
    if (!email || !password || !username) {
        res.render('auth/createUser', { errorMessage: "Please fill out all the information!" })
    }
    //validate that the user password is at least 6 characters long and has 1 capital letter and 1 lowercase letter
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.render('auth/createUser', { errorMessage: "Please input a password: at least 6 characters long, with a lowercase and uppercase letter" })
        return
    }
    bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
            console.log("The salt is ===>", salt)
            return bcrypt.hash(password,salt)
        })
        .then((hashedPassword) => {
            return User.create({
                email: email,
                password: hashedPassword,
                username:username
            })
        })
        .then(() => {
            res.redirect('/loggedUser')
        })
        .catch(error => {
            //Check if any of our mongoose validators are not being met
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/createUser', { errorMessage: error.message });
            }
            //Check if the email is already registered with our website
            else if (error.code === 11000) {
                res.render('auth/createUser',
                )
            }
        })
})

    //This is the routes to login! :)

    router.get('/login', isLoggedOut, (req, res) => {
        res.render('auth/login')
    })

    //middleware function 

    router.get('/createuser', isLoggedIn, (req, res) => {
        res.render('/loggedUser', { userinfo: req.session.currentUser })
    })

    //this is the post route to login! :)

    router.post('/login', (req, res) => {
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            res.render('auth/login', { errorMessage: 'Please enter your email, password and username!' })
            return
        }
        User.findOne({ email })
            .then(user => {
                console.log(user)
                if (!user) {
                    res.render('auth/login', { errorMessage: "user not found! There is no account with this email!" })
                }
            
                else {
                    res.render('auth/login', { errorMessage: "Wrong information!" })
                }
            })
            .catch((error) => { console.log('There is an error', error) })
    })

    //logout button
    router.post('/logout', (req, res, next) => {
        req.session.destroy(error => {
            if (error) next(error);
            res.redirect('/login')
        })
    })

module.exports = router