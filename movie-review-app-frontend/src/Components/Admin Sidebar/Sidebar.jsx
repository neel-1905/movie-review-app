import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <div className="p-2">
        <a
          className="text-decoration-none border border-3 border-dark text-dark fw-semibold fs-4"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
        >
          Menu
        </a>
      </div>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Admin Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-2 py-2">
            <Link to={`/usersList`} className="sideBarLink">
              Users
            </Link>
          </div>
          <div className="mb-2 py-2">
            <Link to={`/addMovie`} className="sideBarLink">
              Add Movie
            </Link>
          </div>
          <div className="mb-2 py-2">
            <Link to={`/listMovies`} className="sideBarLink">
              List of Movies
            </Link>
          </div>
          <div className="mb-2 py-2">
            <Link to={`/addUser`} className="sideBarLink">
              Register New User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
