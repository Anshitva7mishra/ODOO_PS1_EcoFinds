import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footers = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div>
          <Link to="/">
            <h1 className="text-[#007BFF] text-2xl font-bold">
              <span className="text-white font-bold">Eco</span>Finds
            </h1>
          </Link>
          <p className="mt-2 text-sm">
            Powering Your World with the Best in Electronics.
          </p>
          <p className="mt-2 text-sm">
            123 Electronics St, Style City, NY 10001
          </p>
          <p className="text-sm">Email: support@EcoFinds.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-white">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-[#007BFF]">
            <FaFacebook className="hover:text-[#005FCC] cursor-pointer" />
            <FaInstagram className="hover:text-[#005FCC] cursor-pointer" />
            <FaTwitterSquare className="hover:text-[#005FCC] cursor-pointer" />
            <FaPinterest className="hover:text-[#005FCC] cursor-pointer" />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form action="" className="mt-4 flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-md sm:rounded-l-md sm:rounded-r-none text-[#FFFFFF] bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#007BFF] mb-2 sm:mb-0"
            />
            <button
              type="submit"
              className="bg-[#007BFF] text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-[#005FCC] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-8 border-t border-[#333333]/50 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-[#007BFF]">
            <span className="text-white font-bold">Eco</span>Finds
          </span>
          . All rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footers
