const Movie = require("../models/Movie");
const Review = require("../models/Review");
const User = require("../models/User");
const Rating = require("../models/Rating");
const { trusted } = require("mongoose");

// POSTING A REVIEW
const postReview = async (req, res) => {
  const { userId, movieId } = req.params;
  const { review } = req.body;

  try {
    const newReview = new Review({
      userId,
      movieId,
      review,
    });

    const savedReview = await newReview.save();

    try {
      await Movie.findByIdAndUpdate(movieId, {
        $push: { reviews: savedReview?._id },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Review Posted!", savedReview });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// RATE A MOVIE
const rateMovie = async (req, res) => {
  const { userId, movieId } = req.params;
  const { rating } = req.body;

  // try {
  //   const existingRating = await Rating.findOne({ userId, movieId });

  //   if (!existingRating) {
  //     const newRating = new Rating({
  //       userId: userId,
  //       movieId: movieId,
  //       rating: rating,
  //     });

  //     const savedRating = await newRating.save();

  //     const updatedMovie = await Movie.findByIdAndUpdate(
  //       movieId,
  //       {
  //         $push: { votes: savedRating?._id },
  //       },
  //       { new: true }
  //     );

  //     return res.status(200).json({ message: "Movie rated", updatedMovie });
  //   } else {
  //     const existingRating = await Rating.updateOne(
  //       { userId: userId },
  //       { $set: { rating: rating } }
  //     );

  //     return res.status(200).json({ message: "Rating updated" });
  //   }
  // } catch (error) {
  //   return res.status(500).json({ error: error.message });
  // }

  try {
    const updatedRating = await Rating.findByIdAndUpdate(
      { movieId: movieId },
      { $set: { userId: userId, movieId: movieId, rating: rating } },
      { new: true, upsert: true }
    );

    await Movie.findByIdAndUpdate(movieId, {
      $push: { votes: updatedRating._id },
    });

    return res.status(200).json({ message: "Rating done" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET RATING OF MOVIE
const getUserRating = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const rating = await Rating.findOne({ userId, movieId });

    if (!rating) {
      return res.status(404).json({ message: "Not found!" });
    }

    return res
      .status(200)
      .json({ message: "Rating found!", rating: parseFloat(rating.rating) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAvgRating = async (req, res) => {
  const { movieId } = req.params;

  try {
    const avgRating = await Rating.aggregate([
      { $match: { movieId: movieId } },
      {
        $group: {
          _id: null,
          avg: { $avg: "$rating" },
        },
      },
    ]);

    return res.status(200).json({ message: "Avg found", avgRating });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ONE REVIEW
const getOne = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Does not exist" });
    }

    return res.status(200).json({ message: "Found review", review });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETING A REVIEW
const deleteReview = async (req, res) => {
  const { movieId, reviewId } = req.params;
  try {
    await Review.findByIdAndDelete(reviewId);

    try {
      await Movie.findByIdAndUpdate(movieId, {
        $pull: { reviews: reviewId },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Review Deleted!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $set: { ...req.body } },
      { new: true }
    );

    return res.status(200).json({ message: "Review Updated!", updatedReview });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET MOVIE REVIEWS
const getMovieReviews = async (req, res) => {
  const { movieId } = req.params;
  // try {
  //   const reviews = await Review.find({ movieId });

  //   if (!reviews) {
  //     return res.status(404).json({ message: "No reviews yet!" });
  //   }

  //   return res.status(200).json({ message: "Reviews found", reviews });
  // } catch (error) {
  //   return res.status(500).json({ error: error.message });
  // }

  try {
    const reviews = await Review.find({ movieId }).populate(
      "userId",
      { password: 0, isAdmin: 0 },
      "users"
    );

    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found" });
    }

    return res.status(200).json({ message: "Reviews found", reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    if (!reviews) {
      return res.status(404).json({ message: "No reviews yet!" });
    }

    return res.status(200).json({ message: "Reviews found", reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postReview,
  deleteReview,
  updateReview,
  getAllReviews,
  getMovieReviews,
  rateMovie,
  getOne,
  getUserRating,
  getAvgRating,
};
