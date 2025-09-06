import React from 'react'
import banner from '../assets/banner1.jpg'

const MidBanner = () => {
  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-12 md:py-24">
      <div
        className="relative max-w-7xl mx-auto rounded-none md:rounded-2xl bg-cover bg-center h-[400px] sm:h-[500px] md:h-[600px]"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl flex items-center justify-center px-4 sm:px-6 md:px-10">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              Next-Gen Electronics at Your Fingertips
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
              Discover the latest tech innovations with unbeatable prices and
              free shipping on all orders.
            </p>
            <button className="bg-[#007BFF] hover:bg-[#005FCC] text-white font-semibold py-2 px-5 sm:py-3 sm:px-7 rounded-lg transition duration-300 text-sm sm:text-base">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidBanner
