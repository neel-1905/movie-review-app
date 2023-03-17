const User = require("../models/User");
const Review = require("../models/Review");
const Movie = require("../models/Movie");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, isAdmin: 0 });

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    try {
      const reviews = await Review.find({ _id: id });
      const updatedMovies = await Movie.updateMany(
        { reviews: reviews._id },
        { $pull: { reviews: reviews._id } }
      );

      await Review.deleteMany({ userId: id });

      await User.deleteMany({ id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    // try {
    //   const deletedReviews = await Review.deleteMany({ userId: id });

    //   console.log(deletedReviews._id);

    // }
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { ...details } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { ...details },
      },
      { new: true }
    );

    return res.status(200).json({ message: "User Updated!", updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const currentUserPassword = user?.password;

    const currentUserPasswordIsCorrect = await bcrypt.compare(
      currentPassword,
      currentUserPassword
    );

    if (!currentUserPasswordIsCorrect) {
      return res.status(400).json({ message: "Current Password is incorrect" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: { password: hashedPassword },
      });

      return res.status(200).json({ message: "Password Updated" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  updatePassword,
};
