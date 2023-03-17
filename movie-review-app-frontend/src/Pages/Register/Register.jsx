import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
    console.log(registerDetails);
  };

  const handleRegistration = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerDetails?.username,
          email: registerDetails?.email,
          password: registerDetails?.password,
        }),
      });

      const formatRes = await res.json();
      alert(formatRes?.message);
      navigate("/login");
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

              if (
                registerDetails?.password !== registerDetails?.confirmPassword
              ) {
                let error = document.getElementById("errorSpan");
                error.style.display = "block";
                error.innerText = "Passwords do not match";
              } else {
                handleRegistration();
              }
            }}
          >
            <h2 className="py-3">Movie App</h2>
            <h4 className="mb-3">Sign in to your account</h4>

            <div className="form-row pb-3">
              <div className="col-lg-7 w-100">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row pb-3">
              <div className="col-lg-7 w-100">
                <input
                  name="email"
                  type="email"
                  placeholder="Email-Id"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row pb-3">
              <div className="col-lg-7 w-100">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row pb-3">
              <div className="col-lg-7 w-100">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <span style={{ display: "none" }} id="errorSpan"></span>

            <div className="form-row pb-3">
              <div className="col-lg-7 w-100">
                <button className="btn loginBtn w-100">Register Account</button>
              </div>
            </div>
            <p>
              Already have an account? <Link to={`/login`}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
