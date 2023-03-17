import moment from "moment";
import { useEffect, useState } from "react";
// import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Modal from "../Update Modal/Modal";
import "./Review.css";
import { Link } from "react-router-dom";

const Reviews = ({ movieId }) => {
  // const [review, setReview] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [openModal, setOpenModal] = useState(false);

  // const { data, loading, error } = useFetch(
  //   `https://movie-review-app-five.vercel.app/reviews/getMovieReviews/${movieId}`
  // );

  const setUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://movie-review-app-five.vercel.app/reviews/getMovieReviews/${movieId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const formatRes = await res.json();
        setData(formatRes);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    })();
  }, [, data]);

  const handleReviewSubmit = async (review) => {
    try {
      const res = await fetch(
        `https://movie-review-app-five.vercel.app/reviews/postReview/${setUser._id}/${movieId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            review,
          }),
        }
      );

      const formatRes = await res.json();

      alert(formatRes?.message);
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const res = await fetch(
        `https://movie-review-app-five.vercel.app/reviews/deleteReview/${reviewId}/${movieId}/${setUser._id}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const formatRes = await res.json();
      alert(formatRes?.message);
      const filteredData = data.filter((item) => item._id !== reviewId);

      setData(filteredData);
    } catch (error) {
      // alert(error);
      setError(error);
    }
  };

  // const handleModal = (id) => {
  //   setOpenModal(true);
  // };

  return (
    <>
      <div className=" mx-5 reviewContainer position-relative">
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const review = document.getElementById("reviewTextArea").value;
              handleReviewSubmit(review);
            }}
          >
            <div className="form-floating">
              <textarea
                name="review"
                className="form-control"
                placeholder="Leave a review here"
                id="reviewTextArea"
                style={{ height: "100px" }}
                // onChange={(e) => {
                //   review = e.target.value;
                // }}
              ></textarea>
              <label htmlFor="reviewTextArea">Reviews</label>
            </div>
            <button disabled={!setUser} className="btn btn-primary my-3">
              Submit
            </button>
          </form>
        </div>

        <div className="mt-3 mb-0">
          <h2>Reviews</h2>
        </div>

        {loading ? (
          "Please wait loading"
        ) : (
          <>
            {data?.reviews?.map((item, index) => {
              let isCurrentUser = false;
              let userIsAdmin = false;
              if (setUser) {
                // console.log(setUser._id);
                isCurrentUser = item?.userId?._id === setUser?._id;
                userIsAdmin = setUser?.isAdmin;
              } else {
                isCurrentUser = false;
                userIsAdmin = false;
              }

              return (
                <div key={index}>
                  <hr />
                  <div className="my-5 reviewsDiv">
                    <p className="reviewUsername">{item?.userId?.username}</p>
                    <p className="reviewDate">
                      {moment(item?.createdAt).format("MMMM Do YYYY")}
                    </p>
                    <p className="text-light reviewText">{item.review}</p>
                    {isCurrentUser || userIsAdmin ? (
                      <div>
                        <button
                          // onClick={() => handleModal(item?._id)}
                          className="btn btn-outline-light btn-sm me-2"
                        >
                          <Link
                            to={`/updateReview/${item?._id}`}
                            className="text-decoration-none text-white"
                          >
                            Update
                          </Link>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-outline-light btn-sm me-2"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span style={{ display: "none" }}></span>
                    )}
                    {/* {openModal && (
                      <Modal setOpen={setOpenModal} id={item?._id} />
                    )} */}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Reviews;
