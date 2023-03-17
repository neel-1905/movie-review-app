const User = require("../models/User");
const bcrypt = require("bcrypt");

const getEditUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { ...userDetails } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { ...userDetails },
      },
      { new: true }
    );
    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ADDING A USER
const addUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
    return res.status(200).json({ message: "New user added", newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { editUser, getEditUser, addUser };
