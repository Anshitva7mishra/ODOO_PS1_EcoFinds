import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left"
            >
              <feature.icon
                className="h-12 w-12 text-[#007BFF] flex-shrink-0"
                aria-hidden="true"
              />
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <p className="text-base font-semibold text-white">
                  {feature.text}
                </p>
                <p className="mt-1 text-sm text-gray-300">{feature.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
