import React from "react";
import Carousel from "../components/Carousel";
import Features from "../components/Features";
import MidBanner from "../components/MidBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <MidBanner />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
