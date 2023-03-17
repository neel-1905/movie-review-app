import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import AuthContext from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetch";

const MoviesByName = () => {
  const location = useLocation();
  const [data, setData] = useState([]);

  let noOfMovies = data?.movies?.length;
  // console.log(noOfMovies);

  const { user } = useContext(AuthContext);

  const movieName = location.state.movieName;

  // const { data, loading, error, reFetch } = useFetch(
  //   `http://localhost:5000/movies/findByName?name=${movieName}`
  // );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/movies/findByName?name=${movieName}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const formatRes = await res.json();
        setData(formatRes);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  // console.log(data);

  return (
    <>
      <div className="container container-fluid searchMoviesContainer">
        <div className=" my-3">
          <h2>Movies</h2>
          <hr />
          <p>{noOfMovies} Movies Found!</p>
        </div>
        <div className="row">
          {data?.movies?.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-10">
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
                  {user?.isAdmin && (
                    <div className="d-flex justify-content-between mt-2">
                      <Link className="" to={`/editMovie/${item?._id}`}>
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
      <Footer />
    </>
  );
};

export default MoviesByName;
