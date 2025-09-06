import React from "react";
import {
  Users,
  ShoppingBag,
  Search,
  Star,
  Recycle,
  Shield,
  Heart,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-10 sm:py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#007BFF] to-cyan-400 bg-clip-text text-transparent">
            EcoFinds
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8">
            Discover, Share, Sustain - Your Marketplace for Second-Hand Treasures
          </p>
          <div className="bg-[#333333]/50 backdrop-blur rounded-2xl p-6 sm:p-8 border border-white/10">
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              Building a circular economy through trusted peer-to-peer marketplace for pre-owned goods, 
              where every purchase makes a positive environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card
              icon={<Heart className="w-6 sm:w-8 h-6 sm:h-8 text-[#007BFF] mr-3 sm:mr-4" />}
              title="Our Mission"
              text="To create a sustainable marketplace that empowers individuals to give pre-owned items a second life, reducing waste and promoting conscious consumption while building a community of environmentally-minded users."
            />
            <Card
              icon={<Recycle className="w-6 sm:w-8 h-6 sm:h-8 text-[#007BFF] mr-3 sm:mr-4" />}
              title="Our Vision"
              text="To become the leading platform for sustainable commerce, where buying second-hand is the first choice, creating a circular economy that benefits both people and the planet."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCard icon={<Users className="w-5 sm:w-6 h-5 sm:h-6 text-[#007BFF]" />} title="User Profiles" text="Secure authentication and personalized profiles for buyers and sellers" />
            <FeatureCard icon={<ShoppingBag className="w-5 sm:w-6 h-5 sm:h-6 text-[#007BFF]" />} title="Product Management" text="Easy listing creation, editing, and management for your items" />
            <FeatureCard icon={<Search className="w-5 sm:w-6 h-5 sm:h-6 text-[#007BFF]" />} title="Smart Search" text="Advanced filtering and category-based discovery system" />
            <FeatureCard icon={<ShoppingBag className="w-5 sm:w-6 h-5 sm:h-6 text-[#007BFF]" />} title="Shopping Cart" text="Seamless purchasing experience with cart and order history" />
            <FeatureCard icon={<Shield className="w-5 sm:w-6 h-5 sm:h-6 text-[#007BFF]" />} title="Secure Transactions" text="Safe and reliable payment processing with buyer protection" />
            <FeatureCard icon={<Recycle className="w-5 sm:w-6 h-5 sm:h-6 text-[#007BFF]" />} title="Sustainability Focus" text="Promoting circular economy and environmental consciousness" />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            Making an Impact
          </h2>
          <div className="bg-[#333333]/50 backdrop-blur rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <StatBox number="10,000+" label="Items Given New Life" />
              <StatBox number="5,000+" label="Active Community Members" />
              <StatBox number="50 tons" label="Waste Diverted from Landfills" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#007BFF]/10 to-cyan-400/10 backdrop-blur rounded-2xl p-8 sm:p-12 border border-[#007BFF]/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Join the Sustainable Revolution
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Be part of a community that values sustainability, quality, and conscious consumption.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#007BFF] hover:bg-[#0056CC] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#007BFF]/25"
            >
              <Star className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Start Shopping Sustainably
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable Card
function Card({ icon, title, text }) {
  return (
    <div className="bg-[#333333]/50 backdrop-blur rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#007BFF]/30 transition-all duration-300">
      <div className="flex items-center mb-4 sm:mb-6">
        {icon}
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{text}</p>
    </div>
  );
}

// Reusable Feature Card
function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-[#333333]/50 backdrop-blur rounded-xl p-5 sm:p-6 border border-white/10 hover:border-[#007BFF]/30 transition-all duration-300 group">
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="mr-2 sm:mr-3 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm sm:text-base">{text}</p>
    </div>
  );
}

// Reusable Stat Box
function StatBox({ number, label }) {
  return (
    <div className="group">
      <div className="text-2xl sm:text-4xl font-bold text-[#007BFF] mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="text-gray-400 text-sm sm:text-base">{label}</div>
    </div>
  );
}

