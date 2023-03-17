const express = require("express");
const {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  updatePassword,
} = require("../controllers/users");
const { verifyAdmin, verifyUser } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/getAllUsers", verifyAdmin, getAllUsers);
router.get("/getOneUser/:userId", verifyUser, getOneUser);
router.delete("/deleteUser/:id", verifyUser, deleteUser);
router.put("/updateUser/:userId", verifyUser, updateUser);
router.put("/updatePassword/:userId", verifyUser, updatePassword);

module.exports = router;
