const { Schema, model, default: mongoose } = require("mongoose");

const petSchema = new Schema({
    animalType: String,
    animalSize: String,
    animalName: String,
    animalAge: Number,
    animalGender: String,
    animalImage: String,
    user_id:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
},
    {
    timestamps:true
    })

const Pets = mongoose.model('Pet', petSchema)
    
module.exports = Pets