const UserModel = require("../model/user.model");

exports.createUser = async (req, res, next) => {
  try {
    const createdModel = await UserModel.create({
      email: req.body.email,
      password: req.body.password,
      // profilePic: req.file.path,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      typeOfUser: req.body.typeOfUser,
      profession: req.body.profession,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    });
    res.status(201).json(createdModel);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const singleUser = await UserModel.findById(req.params.id);
    if (singleUser) {
      res.status(200).json(singleUser);
    } else {
      res.status(404).json("user not found");
    }
  } catch(err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false
    });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    next(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    next(err);
  }
}
