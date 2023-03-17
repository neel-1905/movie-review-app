import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
// import "./editUser.css";
import "../Login/login.css";

const EditUser = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [editData, setEditData] = useState("");
  const [radio, setRadio] = useState(false);
  const navigate = useNavigate();

  //   console.log(editData);

  //   Handling input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
    console.log(editData);
  };

  //Fetchign user data to be edited
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          //   `http://localhost:5000/users/getOneUser/${location.state.id}`,
          `http://localhost:5000/admin/getEditUser/${location.state.id}/${user._id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const formatRes = await res.json();
        setEditData(formatRes?.user);
        setRadio(formatRes?.user.isAdmin);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  //Handling state change for radio
  const handleRadioChange = (e) => {
    setRadio(e.target.value === "true");
  };

  //Handling radio value on immediate change
  useEffect(() => {}, [radio]);

  //Handling edit request for edit user
  const handleEditUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/admin/editUser/${location.state.id}/${user._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: editData?.username,
            email: editData?.email,
            isAdmin: radio,
          }),
        }
      );

      const formatRes = await res.json();

      alert(formatRes?.message);

      navigate("/usersList");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center loginFormContainer">
        <div className="col-4 loginFormMain">
          <form
            className="p-4 border border-dark rounded loginForm"
            onSubmit={(e) => {
              e.preventDefault();

              handleEditUser();

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
                  value={editData?.username}
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
                  value={editData?.email}
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
    </>
  );
};

export default EditUser;
