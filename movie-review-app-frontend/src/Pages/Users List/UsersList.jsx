import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Admin Sidebar/Sidebar";
import AuthContext from "../../Context/AuthContext";
import "./userslist.css";

const UsersList = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const setUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://movie-review-app-five.vercel.app/users/getAllUsers`,
          {
            credentials: "include",
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

  const otherUsers = data?.users?.filter((user) => user._id !== setUser._id);

  const handleUserDelete = async (userId) => {
    try {
      const res = await fetch(
        `https://movie-review-app-five.vercel.app/users/deleteUser/${userId}`,
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

      const filteredUser = data?.users?.filter((user) => user._id !== userId);
      setData(filteredUser);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <Sidebar />
          <h2 className="text-center mb-5">List of Users</h2>
        </div>
        <div>
          <div className="table-responsive">
            <table className="table usersTable">
              <thead>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Registration Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {otherUsers?.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item?.username}</td>
                    <td>{item?.email}</td>

                    <td>{moment(item?.createdAt).format("MMMM Do YYYY")}</td>
                    <td>
                      <button className="mx-1 text-decoration-none">
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/editUser`}
                          state={{ id: item?._id }}
                        >
                          Edit
                        </Link>
                      </button>
                      <button
                        onClick={() => handleUserDelete(item?._id)}
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

export default UsersList;
