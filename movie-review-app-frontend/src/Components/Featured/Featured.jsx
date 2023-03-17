import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.css";

const Featured = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://movie-review-app-five.vercel.app/movies/getSome",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const formatRes = await res.json();

        setMovies(formatRes?.movies);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  //  console.log(movies);

  return (
    <>
      <div className="container container-fluid ">
        <div className="text-center my-5">
          <h1>Featured Movies</h1>
          <hr />
        </div>

        <div className="row">
          {movies.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card mb-5 shadow-sm">
                <img
                  src="https://source.unsplash.com/random/movie"
                  className="img-fluid featuredImg"
                  alt=""
                />

                <div className="card-body">
                  <div className="card-title">
                    <Link
                      key={index}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Featured;
