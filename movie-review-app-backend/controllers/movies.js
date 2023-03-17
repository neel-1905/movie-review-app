const { findByIdAndDelete } = require("../models/Movie");
const Movie = require("../models/Movie");
const Review = require("../models/Review");

const createMovie = async (req, res) => {
  const { title, description, genre, cast, country, duration, releaseDate } =
    req.body;

  try {
    const movie = await Movie.findOne({ title });

    if (movie) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    const newMovie = new Movie({
      title,
      description,
      genre,
      cast,
      country,
      duration,
      releaseDate,
    });

    await newMovie.save();

    return res.status(200).json({ message: "Movie uploaded", newMovie });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: error.message });
  }
};

// GET ALL MOVIES
const getAll = async (req, res) => {
  try {
    const movies = await Movie.find({});

    if (!movies) {
      return res.status(404).json({ message: "Movies not found" });
    }

    return res.status(200).json({ message: "Movies found", movies });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//GET SOME MOVIES
const getSome = async (req, res) => {
  try {
    const movies = await Movie.find({}).limit(12);

    if (!movies) {
      return res.status(404).json({ message: "Movies not found" });
    }

    return res.status(200).json({ message: "Movies found", movies });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ONE MOVIE
const getMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ message: "Movie found", movie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    try {
      await Review.deleteMany({ movieId: movieId });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Movie Deleted!", deletedMovie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//UPDATE MOVIES
const editMovie = async (req, res) => {
  const { movieId } = req.params;
  const { ...movieDetails } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      {
        $set: { ...movieDetails },
      },
      { new: true }
    );
    return res.status(200).json({ message: "Movie updated", updatedMovie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findByName = async (req, res) => {
  const { name } = req.query;
  try {
    const movies = await Movie.find({
      title: { $regex: new RegExp(name, "i") },
    }).sort({ title: 1 });

    if (!movies) {
      return res.status(400).json({ message: "No movies found" });
    }

    return res.status(200).json({ message: "Movies found", movies });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const filterMovies = async (req, res) => {
  const { country, genre } = req.query;

  try {
    if ((country === "Any" && genre === "Any") || (!country && !genre)) {
      const filteredMovies = await Movie.find({});
      return res.status(200).json({ message: "Movies found", filteredMovies });
    } else if (country !== "Any" && genre === "Any") {
      const filteredMovies = await Movie.find({ country });
      return res.status(200).json({ message: "Movies found", filteredMovies });
    } else if (country === "Any" && genre !== "Any") {
      const filteredMovies = await Movie.find({ genre });
      return res.status(200).json({ message: "Movies found", filteredMovies });
    } else if (country !== "Any" && genre !== "Any") {
      const filteredMovies = await Movie.find({ country, genre });
      return res.status(200).json({ message: "Movies found", filteredMovies });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovie,
  getAll,
  deleteMovie,
  getMovie,
  deleteMovie,
  getSome,
  findByName,
  filterMovies,
  editMovie,
};
