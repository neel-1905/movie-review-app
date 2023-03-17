const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  movieId: mongoose.Types.ObjectId,
  rating: Number,
});

const Rating = mongoose.model("ratings", RatingSchema);

module.exports = Rating;
