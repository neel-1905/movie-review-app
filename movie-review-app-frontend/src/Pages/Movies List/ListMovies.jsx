import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Admin Sidebar/Sidebar";
import AuthContext from "../../Context/AuthContext";
import "./listmovies.css";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContext);

  // console.log(movies);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/movies/getAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const formatRes = await res.json();
        setMovies(formatRes);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  const handleMovieDelete = async (movieId) => {
    try {
      console.log(movieId);
      const res = await fetch(
        `http://localhost:5000/movies/deleteMovie/${movieId}`,
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

      const filteredMovies = movies?.movies?.filter(
        (movie) => movie._id !== movieId
      );

      setMovies(filteredMovies);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <Sidebar />
          <h2 className="text-center mb-5">List of Movies</h2>
        </div>
        <div>
          <div className="table-responsive">
            <table className="table moviesList">
              <thead>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Release Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {movies?.movies?.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item?.title}</td>
                    <td>{item?.genre}</td>

                    <td>{moment(item?.releaseDate).format("MMMM Do YYYY")}</td>
                    <td>
                      <button className="mx-1 text-decoration-none">
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/editMovie/${item?._id}`}
                        >
                          Edit
                        </Link>
                      </button>
                      <button
                        onClick={() => handleMovieDelete(item?._id)}
                        className="mx-1 text-decoration-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMovies;
