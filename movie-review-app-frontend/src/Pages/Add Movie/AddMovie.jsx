import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(null);

  const navigate = useNavigate();

  // console.log(date);
  // console.log(genre);
  // console.log(country);

  const handleChange = (e) => {
    setMovieDetails({ ...movieDetails, [e.target.name]: e.target.value });
    console.log(movieDetails);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("yyyy-MM-DD"));
  };

  useEffect(() => {}, [genre]);

  const handleAddMovie = async () => {
    try {
      const res = await fetch(`http://localhost:5000/movies/createMovie`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: movieDetails?.title,
          cast: movieDetails?.cast,
          genre: genre,
          country: country,
          description: movieDetails?.description,
          releaseDate: date,
          duration: movieDetails?.duration,
        }),
      });

      const formatRes = await res.json();

      alert(formatRes?.message);
      navigate("/adminDashboard");
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

              if (
                !movieDetails?.title ||
                !movieDetails?.cast ||
                !movieDetails?.description ||
                !movieDetails?.duration ||
                !date ||
                !genre ||
                !country
              ) {
                alert("Please fill all the details");
              } else {
                handleAddMovie();
              }
            }}
          >
            <h2 className="py-1">Movie App</h2>
            <h4 className="mb-3">Add Movie</h4>

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

            <div className="form-row row row-g3 py-2">
              <div className="col col-md-6 col-lg-6">
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

              <div className="col col-md-6 col-lg-6">
                <label htmlFor="country">Country:</label>
                <select
                  id="country"
                  className="form-select"
                  onChange={handleCountry}
                  value={country}
                >
                  <option value="" disabled hidden>
                    Select a Country
                  </option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="South Korea">South Korea</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="UK">UK</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  {/* <option value="Romantic">Romantic</option>
                  <option value="History">History</option>
                  <option value="Sports">Sports</option> */}
                </select>
              </div>
            </div>

            <div className="form-row py-2">
              <div className="col-6 w-100">
                <textarea
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
                  name="duration"
                  className="form-control"
                  id="duration"
                  placeholder="eg: 2hr 20min"
                  onChange={handleChange}
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
                <button className="btn loginBtn w-100">Add Movie</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMovie;
