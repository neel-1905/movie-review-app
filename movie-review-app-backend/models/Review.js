const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    movieId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    review: {
      type: String,
      max: 4000,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("reviews", ReviewSchema);

module.exports = Review;
