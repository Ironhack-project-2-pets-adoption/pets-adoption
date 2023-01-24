const mongoose = require("mongoose");
const router = require("express").Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const User = require("../models/User.model");
const Pets = require("../models/Pet.model");

const likedAnimals = [];

//Adoption condition page

router.get("/adoptionConditions", (req, res) => {
  res.render("adoptionConditions");
});

//animal profile page
router.get("/animalprofile", (req, res) => {
  res.render("animalProfile");
});

//router to add an animal to the favourited list
// router.get('/likeButton', (req, res) => {
//     likedAnimals.push(ObjectId)
// })

//favourited animals page
router.get("/favouritedAnimals", isLoggedIn, (req, res) => {
  res.render("favouritedAnimals");
});

//animalSearch all animals page
router.get("/search/animalssearch", (req, res) => {
  Pets.find()
    .populate("user_id")
    .then((result) => {
      console.log(result);
      res.render("search/animalsList", result);
    })
      .catch((error) => {
        console.log("There is an error!",error)
    })
});

//Animal profile one profile ===> this is the route for searching for one animal.
//The result of the search should be posted on the following page: "/pets/animalProfileResult.hbs"
router.get("/pets/:petsId", (req, res) => {
  console.log(req.params);
    Pets.findById(req.params.petsId)
        .then((result) => {
            console.log(result);
            res.render("pets/animalProfileResult", { result });
        })
        .catch((error) => {
        console.log("There is an error",error)
    })
});

//router for the delete button =>
router.post("/pets/:petsId/delete", (req, res) => {
  console.log(req.params.petsId);
    Pets.findByIdAndDelete(req.params.petsId)
        .then(() => {
    res.redirect("/");
        })
        .catch((error) => {
        console.log("there is an error deleting the pet!===>",error)
    })
});
module.exports = router;
