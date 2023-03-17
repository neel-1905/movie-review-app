import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  // console.log(user, loading, error);

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    console.log(loginDetails);
  };

  const handleLogin = async (e) => {
    // e.preventDefault();
    dispatch({ type: "LOGIN" });
    try {
      const res = await axios.post(
        "https://movie-review-app-five.vercel.app/auth/login",
        loginDetails,
        { withCredentials: true }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      //   setTimeout(() => {
      //     navigate("/");
      //   }, 1000);
      // navigate("/");
      window.history.back();
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
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

              handleLogin(e);
            }}
          >
            <h2 className="py-3">Movie App</h2>
            <h4 className="mb-3">Sign in to your account</h4>

            <div className="form-row">
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

            <div className="form-row py-3">
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

            {error && (
              <div className="form-row ">
                <div className="col-lg-7 w-100">
                  <span className="errorSpan" id="errorSpan">
                    {error.message}
                  </span>
                </div>
              </div>
            )}

            <div className="form-row py-3">
              <div className="col-lg-7 w-100">
                <button disabled={loading} className="btn loginBtn w-100">
                  Login
                </button>
              </div>
            </div>
            <p>
              Don't have an account? <Link to={`/register`}>Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
