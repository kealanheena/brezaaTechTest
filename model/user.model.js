const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  typeOfUser: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
