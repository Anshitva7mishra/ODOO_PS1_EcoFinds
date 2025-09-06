import React, { useEffect } from "react";
import { getData } from "../context/DataCOntext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const SamplePrevArrow = ({ className, style, onClick }) => (
    <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
      <AiOutlineArrowLeft
        style={{
          ...style,
          display: "block",
          borderRadius: "50%",
          background: "#007BFF",
          color: "#FFFFFF",
          position: "absolute",
          padding: "6px",
          left: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 0 6px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );

  const SampleNextArrow = ({ className, style, onClick }) => (
    <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
      <AiOutlineArrowRight
        style={{
          ...style,
          display: "block",
          borderRadius: "50%",
          background: "#007BFF",
          color: "#FFFFFF",
          position: "absolute",
          padding: "6px",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 0 6px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="overflow-hidden relative bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-12">
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => (
          <div key={item.id || index} className="w-full flex justify-center items-center">
            <div className="flex flex-col-reverse md:flex-row gap-8 justify-between items-center px-6 md:px-16">
              {/* Text */}
              <div className="w-full md:w-1/2 text-center md:text-left space-y-3">
                <h3 className="text-[#007BFF] font-semibold text-sm md:text-base">
                  Powering Your World with the Best in Electronics
                </h3>
                <h1 className="text-lg md:text-2xl font-bold uppercase text-[#FFFFFF]">
                  {item.title}
                </h1>
                <p className="text-[#9CA3AF] text-sm md:text-base">
                  {item.description}
                </p>
                <button className="bg-[#007BFF] hover:bg-[#005FCC] text-white px-4 py-2 rounded-md mt-2 transition-colors">
                  Shop Now
                </button>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-full w-44 h-44 md:w-64 md:h-64 object-cover hover:scale-105 transition-transform shadow-xl shadow-[#333333]/50"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
