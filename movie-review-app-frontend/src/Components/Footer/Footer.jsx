import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container footerContainer">
          <div className="row d-flex justify-content-center">
            <div className=" col-lg-3 col-md-4 col-sm-6 ">
              <ul className="footerList">
                <li>Home</li>
                <li>Terms and Services</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className=" col-lg-3 col-md-4 col-sm-6 ">
              <ul className="footerList">
                <li>Home</li>
                <li>Terms and Services</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className=" col-lg-3 col-md-4 col-sm-6 ">
              <ul className="footerList">
                <li>Home</li>
                <li>Terms and Services</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className=" col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center align-items-center ">
              {/* <ul className="footerList">
                <li>Home</li>
                <li>Terms and Services</li>
                <li>About Us</li>
                <li>Contact Us</li>
              </ul> */}
              <h1>Movie App</h1>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright text-center">
        ©️ Copyright 2023 Movie App By Neel
      </div>
    </>
  );
};

export default Footer;
