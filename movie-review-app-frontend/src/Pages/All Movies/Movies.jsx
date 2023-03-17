import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filters from "../../Components/Filters/Filters";
import AuthContext from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Movies = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("Any");
  const [genre, setGenre] = useState("Any");
  const [url, setUrl] = useState(
    `https://movie-review-app-five.vercel.app/movies/filterMovies`
  );

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // console.log(country);
    setUrl(
      `https://movie-review-app-five.vercel.app/movies/filterMovies?country=${country}&genre=${genre}`
    );
  }, [country, genre]);

  useEffect(() => {
    (async () => {
      // console.log(url);
      try {
        // console.log(url);
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const formatRes = await res.json();

        setData(formatRes);
      } catch (error) {
        alert(error);
      }
    })();
  }, [, url]);

  // console.log(data);

  return (
    <>
      <div>
        <div className="container container-fluid searchMoviesContainer">
          <div className=" my-3">
            <h2>Movies</h2>
            <hr />
          </div>

          <div>
            <div className="row d-flex flex-wrap">
              <div className="col-12 col-sm-6 p-2 d-flex justify-content-center">
                <div className="form-floating w-50">
                  <select
                    id="selectCountry"
                    className="form-select"
                    aria-label="Default select example"
                    value={country}
                    onChange={(e) => {
                      const selectedCountry = e.target.value;
                      setCountry(selectedCountry);
                    }}
                  >
                    <option value="Any">Any</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Spain">Spain</option>
                    <option value="South Korea">South Korea</option>
                    <option value="France">France</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                  </select>
                  <label htmlFor="selectCountry">Country</label>
                </div>
              </div>

              <div className="col-12 col-sm-6 p-2 d-flex justify-content-center">
                <div className="form-floating w-50">
                  <select
                    id="selectGenre"
                    className="form-select "
                    aria-label="Default select example"
                    value={genre}
                    onChange={(e) => {
                      const selectedGenre = e.target.value;
                      setGenre(selectedGenre);
                    }}
                    // onChange = {handleGenreChange}
                  >
                    <option value="Any">Any</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Drama">Drama</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Horror">Horror</option>
                    <option value="Action">Action</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Murder Mystery">Murder Mystery</option>
                    <option value="History">History</option>
                    <option value="Sports">Sports</option>
                  </select>
                  <label htmlFor="selectGenre">Genre</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            {data?.filteredMovies?.map((item, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-10" key={index}>
                <div className="card mb-5 shadow-sm">
                  <img
                    src="https://source.unsplash.com/random/movie"
                    className="img-fluid featuredImg"
                    alt=""
                  />

                  <div className="card-body">
                    <div className="card-title">
                      <Link
                        className="featuredLink"
                        to={`/movie`}
                        state={{ id: item?._id }}
                      >
                        <p className="movieTitle">{item.title}</p>
                      </Link>
                    </div>
                    <div className="card-text w-100 d-flex justify-content-between featuredBottom">
                      <div>Rating</div>
                      <div>Time</div>
                    </div>
                    {user?.isAdmin && (
                      <div className="d-flex justify-content-between mt-2">
                        <Link className="" to={`/updateMovie/${item?._id}`}>
                          Update
                        </Link>

                        <Link className="" to={`/deleteMovie/${item?._id}`}>
                          Update
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
