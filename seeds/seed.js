const mongoose = require("mongoose");
const user = require("../models/User.model");
const Pet = require("../models/Pet.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pets-adoption";

const pets = [
  {
    animalType: "Dog",
    animalSize: "Medium",
    animalName: "Bobby",
    animalAge: 8,
    animalGender: "Male",
    animalImage: `https://publish.purewow.net/wp-content/uploads/sites/2/2021/07/big-dog-breeds-akita.jpg?fit=728%2C524`,
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Dog",
    animalSize: "Large",
    animalName: "Charlie",
    animalAge: 4,
    animalGender: "Female",
    animalImage: `https://www.akc.org/wp-content/uploads/2017/11/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg`,
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Dog",
    animalSize: "Small",
    animalName: "Bella",
    animalAge: 2,
    animalGender: "Female",
    animalImage: `https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016_960_720.jpg`,
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Cat",
    animalSize: "Big",
    animalName: "Soto",
    animalAge: 10,
    animalGender: "Male",
    animalImage: `https://rawznaturalpetfood.com/wp-content/uploads/Norwegian-Forest-Cats.jpeg`,
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Cat",
    animalSize: "Medium",
    animalName: "Lucky",
    animalAge: 6,
    animalGender: "Male",
    animalImage: `https://www.rd.com/wp-content/uploads/2019/09/Cute-cat-lying-on-his-back-on-the-carpet.-Breed-British-mackerel-with-yellow-eyes-and-a-bushy-mustache.-Close-up-e1573490045672.jpg`,
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Cat",
    animalSize: "Small",
    animalName: "Fluffy",
    animalAge: 14,
    animalGender: "Female",
    animalImage: `https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F08%2F15%2Fwhite-munchkin-cat_150890825-2000.jpg`,
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Fish",
    animalSize: "Large",
    animalName: "Freddy",
    animalAge: 3,
    animalGender: "Male",
    animalImage:
      "https://fishkeepingadvice.com/wp-content/uploads/sunset-guppy.webp",
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Fish",
    animalSize: "Medium",
    animalName: "Moby Dick",
    animalAge: 2,
    animalGender: "Female",
    animalImage:
      "https://fishkeepingadvice.com/wp-content/uploads/danio-fish-1024x768.jpg",
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Fish",
    animalSize: "Small",
    animalName: "Orca",
    animalAge: 5,
    animalGender: "Male",
    animalImage:
      "https://www.everythingfishkeeping.com/wp-content/uploads/2021/02/Goldfish.jpg",
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Bird",
    animalSize: "Large",
    animalName: "Loco",
    animalAge: 6,
    animalGender: "Male",
    animalImage:
      "https://tajbirds.com/wp-content/uploads/2021/08/satinette-pigeon.jpg",
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Bird",
    animalSize: "Medium",
    animalName: "Chickie",
    animalAge: 3,
    animalGender: "Female",
    animalImage:
      "https://www.thehappychickencoop.com/wp-content/uploads/2022/07/blue-quaker-pet-bird.jpg",
    user_id: "63d29a579419db273ed86a32",
  },
  {
    animalType: "Bird",
    animalSize: "Small",
    animalName: "Mr. Beaks",
    animalAge: 6,
    animalGender: "Male",
    animalImage:
      "https://www.thehappychickencoop.com/wp-content/uploads/2022/07/Rainbow-Lorikeet-medium-pet-bird.jpg",
    user_id: "63d29a579419db273ed86a32",
  },
];

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("===> Its connected! <===");

    Pet.insertMany(pets);
  })
  .catch((error) => {
    console.log("===> THERE IS AN ERROR <===", error);
  });
