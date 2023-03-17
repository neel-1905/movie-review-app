import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  nav fixed-top">
        <div className="container">
          <Link className="navbar-brand text-white" href="#">
            Movie App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={`/`}
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={`/movies`}
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Movies
                </Link>
              </li>
            </ul>

            <form
              className="d-flex w-75"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/moviesByName", { state: { movieName: search } });
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn search" type="submit">
                Search
              </button>
            </form>

            {/* <Link
              to={"/login"}
              className="nav-link mx-lg-3 text-decoration-none login"
            >
              Login
            </Link> */}

            {user ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.username}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={`/profile`}
                      state={{ userId: user?._id }}
                      className="dropdown-item"
                    >
                      Profile
                    </Link>
                  </li>
                  {user?.isAdmin && (
                    <li>
                      <Link
                        to={`/adminDashboard`}
                        state={{ adminId: user?._id }}
                        className="dropdown-item"
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to={`/`}
                      onClick={handleLogout}
                      className="dropdown-item"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <Link
                to={"/login"}
                className="nav-link mx-lg-3 text-decoration-none login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
