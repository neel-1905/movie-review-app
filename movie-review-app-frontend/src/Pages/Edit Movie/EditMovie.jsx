import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editMovie.css";

const EditMovie = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState(null);
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState(null);

  const handleChange = (e) => {
    setMovieDetails({ ...movieDetails, [e.target.name]: e.target.value });
    console.log(movieDetails);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("yyyy-MM-DD"));
  };

  console.log(genre);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/movies/getMovie/${params.movieId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const formatRes = await res.json();
        setMovieDetails(formatRes?.movie);
        setGenre(formatRes?.movie?.genre);
        setDate(formatRes?.movie?.releaseDate);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  useEffect(() => {}, [genre]);

  const handleUpdateMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/movies//editMovie/${params.movieId}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: movieDetails?.title,
            cast: movieDetails?.cast,
            genre: genre,
            description: movieDetails?.description,
            releaseDate: date,
            duration: movieDetails?.duration,
          }),
        }
      );

      const formatRes = await res.json();

      alert(formatRes?.message);

      navigate("/listMovies");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center loginFormContainer">
        <div className="col-8 loginFormMain">
          <form
            className="px-4 border border-dark rounded loginForm"
            onSubmit={(e) => {
              e.preventDefault();

              handleUpdateMovie();
            }}
          >
            <h2 className="py-1">Movie App</h2>
            <h4 className="mb-3">Update Movie</h4>

            <div className="form-row row g-3">
              <div className="col col-md-6 col-lg-6">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  onChange={handleChange}
                  value={movieDetails?.title}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-6 ">
                <label htmlFor="cast" className="form-label">
                  Cast:
                </label>
                <input
                  name="cast"
                  id="cast"
                  type="text"
                  placeholder="Cast"
                  className="form-control"
                  onChange={handleChange}
                  value={movieDetails?.cast}
                />
              </div>
            </div>

            {/* <div className="form-row py-3"> */}
            {/* <div className="col-6 w-100">
                <input
                  name="cast"
                  type="text"
                  placeholder="Cast"
                  className="form-control"
                  onChange={handleChange}
                  value={movieDetails?.cast}
                />
              </div> */}
            {/* </div> */}

            <div className="form-row py-2">
              <div className="col-6  w-100">
                <label htmlFor="genre">Genre:</label>
                <select
                  id="genre"
                  className="form-select"
                  onChange={handleGenre}
                  value={genre}
                >
                  <option value="" disabled hidden>
                    Select a Genre
                  </option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Action">Action</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Murder Mystery">Murder Mystery</option>
                  <option value="Romantic">Romantic</option>
                  <option value="History">History</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="form-row py-2">
              <div className="col-6 w-100">
                <textarea
                  value={movieDetails?.description}
                  className="form-control"
                  name="description"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Description"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="form-row row g-3">
              <div className="col col-md-6 col-lg-6">
                <label htmlFor="releaseDate" className="form-label">
                  Release Date
                </label>
                <input
                  value={moment(date).format("yyyy-MM-DD")}
                  type="date"
                  className="form-control"
                  id="releaseDate"
                  onChange={handleDate}
                ></input>
              </div>

              <div className="col col-md-6 col-lg-6">
                <label htmlFor="duration" className="form-label">
                  Duration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  placeholder="Duration"
                  onChange={handleChange}
                  value={movieDetails?.duration}
                ></input>
              </div>
            </div>

            {/* <div className="form-row py-2">
              <div className="col-6 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  placeholder="Duration"
                  onChange={handleChange}
                  value={movieDetails?.duration}
                ></input>
              </div>
            </div> */}

            {/* <div className="form-row ">
              <div className="col-lg-7 w-100">
                <span className="errorSpan" id="errorSpan">
                  {error.message}
                </span>
              </div>
            </div> */}

            <div className="form-row py-3">
              <div className="col-6 w-100">
                <button className="btn loginBtn w-100">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMovie;
