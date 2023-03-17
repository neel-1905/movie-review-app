const express = require("express");
const { editUser, getEditUser, addUser } = require("../controllers/admin");
const router = express.Router();
const { verifyAdmin } = require("../middleware/verifyToken");

router.put("/editUser/:id/:userId", verifyAdmin, editUser);
router.get("/getEditUser/:id/:userId", verifyAdmin, getEditUser);
router.post("/addUser", verifyAdmin, addUser);

module.exports = router;
