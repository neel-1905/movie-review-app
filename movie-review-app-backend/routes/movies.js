const express = require("express");
const {
  createMovie,
  getAll,
  deleteMovie,
  getMovie,
  getSome,
  findByName,
  filterMovies,
  editMovie,
} = require("../controllers/movies");
const { verifyAdmin } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/createMovie", verifyAdmin, createMovie);
router.get("/getAll", getAll);
router.get("/getSome", getSome);
router.delete("/deleteMovie/:movieId", verifyAdmin, deleteMovie);
router.put("/editMovie/:movieId", verifyAdmin, editMovie);
router.get("/getMovie/:movieId", getMovie);
router.get("/findByName", findByName);
router.get("/filterMovies", filterMovies);

module.exports = router;
