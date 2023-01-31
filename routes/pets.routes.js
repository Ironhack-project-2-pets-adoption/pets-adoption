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

//mySpace route:
router.get("/mySpace", (req, res) => {
  res.render("mySpace");
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

//redirect from animal profile page to the list of animals
router.get("/pets/animalall", (req, res) => {
  res.render("pets/animalall");
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

//router for the CREATE one animal GET =>
router.get("/pets/animalCreate", (req, res) => res.render("pets/animalCreate"));

//router for the CREATE one animal  POST=>
router.post("/pets/animalCreate", (req, res, next) => {
  const { petsId } = req.params;

  Pets.insert(petsId)
    .then(() => res.redirect("/pets/animalCreate"))
    .catch((error) => next(error));
});

//router for the DELETE one animal button =>
router.post("/pets/:petsId/delete", (req, res, next) => {
  const { petsId } = req.params;

  Pets.findByIdAndDelete(petsId)
    .then(() => res.redirect("/pets/animalAll"))
    .catch((error) => next(error));
});

// GET route to display the form to update a specific animal
router.get("/pets/:petsId/edit", (req, res, next) => {
  // const { petsId } = req.params;

  Pets.findById(req.params.petsId)
    .then((result) => {
      // console.log(petsToEdit);
      res.render("pets/animalEdit", result);
    })
    .catch((error) => next(error));
});

// POST route to actually make updates on a specific animal profile
router.post("/pets/:petsId/edit", (req, res, next) => {
  // const { petsId } = req.params;
  const { animalName, animalType, animalGender, animalAge, animalSize } =
    req.body;

  Pets.findByIdAndUpdate(req.params.petsId, {
    animalName: animalName,
    animalType: animalType,
    animalGender: animalGender,
    animalAge: animalAge,
    animalSize: animalSize,
  })

    .then(() => {
      console.log("THE PET IS EDITED");
      // res.render('pets/animalEdit',result)
      res.redirect(`/pets/animalAll`);
    })

    .catch((error) => {
      console.log("There is an errorr", error);
    });
});

module.exports = router;
