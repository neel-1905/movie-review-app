import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const UpdateReview = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState("");
  const { user } = useContext(AuthContext);

  // const handleChange = (e) => {
  //   setData({...data,  [e.target.value]: });
  console.log(data);
  // };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://movie-review-app-five.vercel.app/reviews/getOne/${params.id}`,
          {
            credentials: "include",
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const formatRes = await res.json();
        setData(formatRes?.review);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `https://movie-review-app-five.vercel.app/reviews/updateReview/${params.id}/${user._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            review: data,
          }),
        }
      );
      const formatRes = await res.json();
      alert(formatRes?.message);
      //   setData(formatRes?.review);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <div className="form-floating w-75">
          <textarea
            name="reviewData"
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "200px" }}
            onChange={(e) => {
              setData(e.target.value);
            }}
            value={data?.review}
          ></textarea>
          <label htmlFor="floatingTextarea2">Comments</label>
          <button onClick={handleUpdate} className="btn btn-primary mt-3 w-25">
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateReview;
