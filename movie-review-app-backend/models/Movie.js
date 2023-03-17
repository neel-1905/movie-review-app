const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    cast: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: null,
    },
    votes: [String],
    // {
    //   userId: mongoose.Types.ObjectId,
    //   rating: mongoose.Types.Decimal128,
    // },

    releaseDate: {
      type: Date,
      required: true,
    },
    reviews: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("movies", MovieSchema);

module.exports = Movie;
