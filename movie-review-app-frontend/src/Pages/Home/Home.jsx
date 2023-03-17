import React from "react";
import Featured from "../../Components/Featured/Featured";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Featured />
      <Footer />
    </>
  );
};

export default Home;
