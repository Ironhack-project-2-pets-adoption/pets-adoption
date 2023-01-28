const mongoose = require("mongoose");
const router = require("express").Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const User = require("../models/User.model");
const Pets = require("../models/Pet.model");
const { findById } = require("../models/Pet.model");

const likedAnimals = [];

//Dotation Form:
router.get("/donationform", (req, res) => {
  res.render("donationForm");
});

//Contact Form:
router.get("/contactform", (req, res) => {
  res.render("contactForm");
});

// Adopt : animalSearch page with search filters and serch button
router.get("/search/animalsfilters", (req, res) => {
  Pets.find()
    .populate("user_id")
    .then((result) => {
      console.log(result);
      res.render("search/animalsFilters", result);
    })
    .catch((error) => {
      console.log("There is an error!", error);
    });
});

//display All Animals
router.get("/pets/animalall", (req, res) => {
  Pets.find()
    .populate("user_id")
    .then((result) => {
      res.render("pets/animalall", { result });
    })
    .catch((error) => {
      console.log("there is an error", error);
    });
});

//animal profile page
router.get("/pets/animalprofile/:id", (req, res) => {
  Pets.findById(req.params.id)
    .then((result) => {
      res.render("pets/animalProfile", result);
    })
    .catch((error) => {
      console.log("error", error);
    });
});

//router to add an animal to the favourited list
// router.get('/likeButton', (req, res) => {
//     likedAnimals.push(ObjectId)
// })

//favourited animals page
router.get("/favouritedAnimals", isLoggedIn, (req, res) => {
  res.render("favouritedAnimals");
});

//Animal profile one profile ===> this is the route for searching for one animal.
//The result of the search should be posted on the following page: "/pets/animalProfileResult.hbs"
router.get("/pets/:petsId", (req, res) => {
  console.log(req.params);
  Pets.findById(req.params.petsId)
    .then((result) => {
      console.log(result);
      res.render("pets/animalProfile", { result });
    })
    .catch((error) => {
      console.log("There is an error", error);
    });
});

//router for the delete button =>
router.post("/pets/animalProfile/:id/delete", (req, res) => {
  console.log(req.params.petsId);
  Pets.findByIdAndDelete(req.params.petsId);

  res.render("pets/animalall", { result }).then((result) => {
    console.log(result);

    res.redirect("pets/animalall", { result })
    
    .catch((error) => {
      console.log("there is an error deleting the pet!===>", error);
    });
  });
});

module.exports = router;
