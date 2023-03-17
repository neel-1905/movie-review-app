import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import "./addUser.css";

const AddUser = () => {
  const location = useLocation();
  const [userData, setUserData] = useState("");
  const [radio, setRadio] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  const handleRadioChange = (e) => {
    setRadio(e.target.value === "true");
  };

  useEffect(() => {}, [radio]);

  console.log(userData, radio);

  const handleAddUser = async () => {
    try {
      const res = await fetch(
        `https://movie-review-app-five.vercel.app/admin/addUser`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData?.username,
            email: userData?.email,
            password: userData?.password,
            isAdmin: radio,
          }),
        }
      );
      const formatRes = await res.json();
      alert(formatRes?.message);
      if (formatRes?.message == "New user added") {
        navigate("/adminDashboard");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div>
        <div className=" d-flex justify-content-center align-items-center loginFormContainer">
          <div className="col-4 loginFormMain">
            <form
              className="p-4 border border-dark rounded loginForm"
              onSubmit={(e) => {
                e.preventDefault();

                if (
                  !userData?.username ||
                  !userData?.email ||
                  !userData?.password ||
                  !userData?.confirmPassword
                ) {
                  alert("Please fill all the details");
                } else if (userData?.password !== userData?.confirmPassword) {
                  alert("Passwords do not match");
                } else {
                  handleAddUser();
                }

                // handleEditUser();

                //   handleLogin(e);
              }}
            >
              <h2 className="py-3">Movie App</h2>
              <h4 className="mb-3">Edit User</h4>

              <div className="form-row">
                <div className="col-lg-7 w-100">
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    onChange={handleChange}
                    value={userData?.username}
                  />
                </div>
              </div>

              <div className="form-row py-3">
                <div className="col-lg-7 w-100">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={handleChange}
                    value={userData?.email}
                  />
                </div>
              </div>

              <div className="form-row py-3">
                <div className="col-lg-7 w-100">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={handleChange}
                    // value={userData?.email}
                  />
                </div>
              </div>

              <div className="form-row py-3">
                <div className="col-lg-7 w-100">
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    onChange={handleChange}
                    // value={userData?.email}
                  />
                </div>
              </div>

              <p>Make Admin:</p>
              <div className="form-check d-flex">
                <div className=" me-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="yes"
                    value={true}
                    checked={radio === true}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="yes">
                    Yes
                  </label>
                </div>

                <div className="ms-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="no"
                    //   value="false"
                    value={false}
                    checked={radio === false}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="no">
                    No
                  </label>
                </div>
              </div>

              {/* {error && (
              <div className="form-row ">
                <div className="col-lg-7 w-100">
                  <span className="errorSpan" id="errorSpan">
                    {error.message}
                  </span>
                </div>
              </div>
            )} */}

              <div className="form-row py-3">
                <div className="col-lg-7 w-100">
                  <button className="btn loginBtn w-100">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
