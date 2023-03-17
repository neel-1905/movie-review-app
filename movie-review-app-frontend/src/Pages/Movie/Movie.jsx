import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./movie.css";
import moment from "moment";
// import ReactStars from "react-rating-stars-component";
import { Rating } from "react-simple-star-rating";
import Reviews from "../../Components/Reviews/Reviews";
import Footer from "../../Components/Footer/Footer";
import AuthContext from "../../Context/AuthContext";
// import Star from "react-rating-stars-component/dist/star";

const Movie = () => {
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState(0);
  const [mounted, setMounted] = useState(true);
  const { user } = useContext(AuthContext);
  // const [rating, setRating] = useState(0);
  // const [review, setReview] = useState("");

  // console.log(rating);

  const location = useLocation();

  const date = moment(movie?.date).format("MMMM Do YYYY");

  const handleRating = async (movieRating) => {
    setRating(movieRating);
    console.log(rating);
    try {
      const res = await fetch(
        `http://localhost:5000/reviews/rateMovie/${user._id}/${location.state.id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: rating,
          }),
        }
      );

      const formatRes = await res.json();
      // alert(formatRes?.message);
    } catch (error) {
      alert(error);
    }
  };
  // console.log(date);

  // console.log(movie?._id);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/movies/getMovie/${location.state.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const formatRes = await res.json();
        setMovie(formatRes?.movie);
      } catch (error) {
        alert(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          // `http://localhost:5000/reviews/getRating/${location.state.id}/${user._id}`,
          `http://localhost:5000/reviews/getRating/${location.state.id}/${user._id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const formatRes = await res.json();

        setRating(formatRes?.rating);
        // console.log(rating);
        // alert(formatRes?.message);
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [mounted]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:5000/reviews/rateMovie/${user._id}/${location.state.id}`,
  //         {
  //           credentials: "include",
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             rating: rating,
  //           }),
  //         }
  //       );

  //       const formatRes = await res.json();
  //       // alert(formatRes?.message);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   })();
  // }, [rating]);

  return (
    <>
      <Navbar />
      <div className="mt-5 w-100 movieContainer text-white">
        <div className="row movieDetailsRow">
          <div className="col-sm-12 col-md-12 col-lg-3 order-2 order-sm-2 order-md-2 order-lg-1 p-4 movieDetails">
            <div className="movieDetailsImg">
              <img
                src="https://source.unsplash.com/random"
                className=""
                alt=""
              />
            </div>
            <div className="movieDetailsContent d-flex flex-column">
              <div className="movieTitle my-3">
                <h3>{movie?.title}</h3>
              </div>
              <div className="movieDesc d-flex flex-column">
                <p className="movieDescText">{movie?.description}</p>
                {/* <b>Genre: </b>
                <span>{movie?.genre}</span>

                <b>Genre: </b>
                <span>{movie?.genre}</span> */}

                <div className="row">
                  <div className="col-4">
                    <b>Genre: </b>
                  </div>
                  <div className="col-8">
                    <p>{movie?.genre}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <b>Cast: </b>
                  </div>
                  <div className="col-8">
                    <p>{movie?.cast}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <b>Country: </b>
                  </div>
                  <div className="col-8">
                    <p>{movie?.country}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <b>Duration: </b>
                  </div>
                  <div className="col-8">
                    <p>{movie?.duration}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <b>Release Date: </b>
                  </div>
                  <div className="col-8">
                    <p>{date}</p>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-4">
                    <b>Rate Movie: </b>
                  </div>
                  <div className="col-8"> */}
                {/* <ReactStars
                      value={5}
                      onChange={handleRating}
                      classNames="p-0 m-0"
                      size={25}
                      isHalf={true}
                      count={5}
                    /> */}
                {/* <Rating
                      onClick={handleRating}
                      initialValue={rating}
                      size={20}
                      allowFraction
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-9 order-1 order-sm-1 order-md-1 order-lg-2 movieImg "></div>
        </div>

        <div className="m-5">
          <h2>Discussions</h2>
        </div>

        {/* <div className="m-5">
          <form>
            <div className="form-floating">
              <textarea
                name="review"
                className="form-control"
                placeholder="Leave a review here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <label htmlFor="floatingTextarea2">Reviews</label>
            </div>
            <button className="btn btn-primary my-3">Submit</button>
          </form>
        </div> */}

        <div className="mt-5">
          <Reviews movieId={location.state.id} />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Movie;
