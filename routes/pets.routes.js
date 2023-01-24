const mongoose = require("mongoose");
const router = require("express").Router();
const pets = require("../models/Pet.model");
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require("../models/User.model");

const likedAnimals = []





//Adoption condition page

router.get('/adoptionConditions', (req, res) => {
    res.render('adoptionConditions')
})


//animal profile page
router.get('/animalprofile', (req, res) => {
    res.render('animalProfile')
})

//router to add an animal to the favourited list
// router.get('/likeButton', (req, res) => {
//     likedAnimals.push
// })

//favourited animals page
router.get('/favouritedAnimals', (req, res) => {
    res.render('favouritedAnimals')
})

//animalSearch all animals page

router.get('/animalssearch', (req, res) => {
    res.render('search/animalSearch')
})



module.exports = router