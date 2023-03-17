import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const [editData, setEditData] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState("");

  const { user, dispatch } = useContext(AuthContext);

  // console.log(editData);
  console.log(passwordData);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/users/getOneUser/${user._id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const formatRes = await res.json();
        setEditData(formatRes?.user);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/users/updateUser/${user._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: editData?.email,
            username: editData?.username,
          }),
        }
      );

      const formatRes = await res.json();
      alert(formatRes?.message);
      dispatch({ type: "USER_UPDATE", payload: formatRes?.updatedUser });
      // setEditData(formatRes?.user);
    } catch (error) {
      alert(error);
    }
  };

  const handlePasswordEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/users/updatePassword/${user._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwordData?.currentPassword,
            newPassword: passwordData?.newPassword,
          }),
        }
      );

      const formatRes = await res.json();
      alert(formatRes?.message);

      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h2 className="text-center">Welcome {user?.username}</h2>
      <div className="profileContainer">
        <div className="content d-flex justify-content-center align-items-center flex-column">
          <h4>Update Profile Details</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!editData?.email || !editData?.username) {
                alert("Please fill all the details");
              } else {
                handleEditSubmit();
              }
            }}
          >
            <div className="my-3">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                onChange={handleChange}
                value={editData.username}
              />
              <div className="form-text" id="username">
                Username must be unique
              </div>
            </div>

            <div className="my-3">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                onChange={handleChange}
                value={editData.email}
              />
            </div>
            <button className="btn btn-primary w-100">Edit</button>
          </form>
        </div>

        <div className="content d-flex justify-content-center align-items-center flex-column">
          <h4>Update Password</h4>
          <small>You will have to login again after updating password</small>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (
                !passwordData?.currentPassword ||
                !passwordData?.newPassword ||
                !passwordData?.confirmPassword
              ) {
                alert("Please fill all the details");
              } else if (
                passwordData?.newPassword !== passwordData?.confirmPassword
              ) {
                alert("Passwords do not match");
              } else {
                handlePasswordEdit();
              }
            }}
          >
            <div className="my-3">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="form-control"
                onChange={handlePasswordChange}
                // value={editData.username}
              />
            </div>

            <div className="my-3">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="form-control"
                onChange={handlePasswordChange}
              />
            </div>

            <div className="my-3">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                onChange={handlePasswordChange}
              />
            </div>
            <button className="btn btn-primary w-100">Update Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
