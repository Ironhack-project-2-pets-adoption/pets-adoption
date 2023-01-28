const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
      
    },
    isAdmin: {
      type: Boolean,
      default:false
    },
    email: {
      type: String,
      required: [true,"Your email adress is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLenght:[8,"Your password needs to be 8 characters long!"]
      
    },
    favouriteAnimal: [{
      type:Schema.Types.ObjectId, ref:'Pet'
    }]
  },
  {
      
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
