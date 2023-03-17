const express = require("express");
const {
  postReview,
  deleteReview,
  updateReview,
  getAllReviews,
  rateMovie,
  getMovieReviews,
  getOne,
  getUserRating,
  getAvgRating,
} = require("../controllers/reviews");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/postReview/:userId/:movieId", verifyUser, postReview);
router.delete(
  "/deleteReview/:reviewId/:movieId/:userId",
  verifyUser,
  deleteReview
);
router.get("/getAvgRating/:movieId", getAvgRating);
router.put("/updateReview/:reviewId/:userId", verifyUser, updateReview);
router.get("/getRating/:movieId/:userId", verifyUser, getUserRating);
router.get("/getAllReviews", verifyAdmin, getAllReviews);
router.get("/getMovieReviews/:movieId", getMovieReviews);
router.put("/rateMovie/:userId/:movieId", rateMovie);
router.get("/getOne/:reviewId", getOne);

module.exports = router;
