import React, { useState } from "react";
import {
  Mail,
  Phone,
  Building,
  Headphones,
  Send,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [errors, setErrors] = useState({});

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with your account, orders, or general questions",
      contact: "support@ecofinds.com",
      response: "24-48 hours",
    },
    {
      icon: Phone,
      title: "Customer Service",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: Building,
      title: "Business Inquiries",
      description: "Partnership opportunities and business development",
      contact: "business@ecofinds.com",
      response: "48-72 hours",
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Help with platform issues and technical problems",
      contact: "tech@ecofinds.com",
      response: "12-24 hours",
    },
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer:
        'Click on "Forgot Password" on the login page and follow the instructions sent to your email. If you don\'t receive an email within 10 minutes, check your spam folder or contact support.',
    },
    {
      question: "Why was my listing rejected?",
      answer:
        "Listings may be rejected if they don't meet our sustainability guidelines, contain inappropriate content, or lack proper product descriptions. Review our listing guidelines and try again, or contact support for specific feedback.",
    },
    {
      question: "How do payments work on EcoFinds?",
      answer:
        "We use secure payment processing through Stripe. Buyers pay when they purchase, and sellers receive payment after the item is delivered and confirmed. We hold funds for 48 hours to ensure transaction security.",
    },
    {
      question: "What items are allowed on the platform?",
      answer:
        "We accept gently used clothing, electronics, home goods, books, and other sustainable items. Prohibited items include damaged goods, counterfeit products, and items that don't align with our eco-friendly mission.",
    },
    {
      question: "How do I become a verified seller?",
      answer:
        "Complete your profile, verify your email and phone number, and make your first successful sale. Verified sellers get priority in search results and access to advanced selling tools.",
    },
    {
      question: "What if I receive a damaged item?",
      answer:
        "Contact the seller first to resolve the issue. If unsuccessful, open a dispute through your order page within 7 days. Our team will mediate and ensure a fair resolution, including refunds when appropriate.",
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
            }}
          >
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-4">
            We're here to help you make sustainable shopping easier. Whether
            you're buying, selling, or just have questions about our platform,
            our team is ready to assist you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-[#333333]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-[#333333]/70 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#007BFF]/20 rounded-xl mb-4">
                <method.icon className="w-6 h-6 text-[#007BFF]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {method.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{method.description}</p>
              <div className="space-y-2">
                <p className="text-white font-medium">{method.contact}</p>
                <p className="text-gray-500 text-xs">{method.response}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#333333]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send us a Message
            </h2>

            {showSuccess && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-400 font-medium">
                  ✓ Message sent successfully! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className={`w-full bg-white/5 border ${
                      errors.name ? "border-red-500" : "border-white/20"
                    } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF] transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full bg-white/5 border ${
                      errors.email ? "border-red-500" : "border-white/20"
                    } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF] transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className={`w-full bg-white/5 border ${
                    errors.subject ? "border-red-500" : "border-white/20"
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#007BFF] transition-colors`}
                >
                  <option value="" className="bg-[#333333] text-gray-400">
                    Select a subject
                  </option>
                  <option value="general" className="bg-[#333333] text-white">
                    General Inquiry
                  </option>
                  <option value="bug" className="bg-[#333333] text-white">
                    Bug Report
                  </option>
                  <option value="business" className="bg-[#333333] text-white">
                    Business Partnership
                  </option>
                  <option value="account" className="bg-[#333333] text-white">
                    Account Issue
                  </option>
                  <option value="other" className="bg-[#333333] text-white">
                    Other
                  </option>
                </select>
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  className={`w-full bg-white/5 border ${
                    errors.message ? "border-red-500" : "border-white/20"
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF] transition-colors resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#007BFF] hover:bg-[#005FCC] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-[#333333]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 py-4 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white font-medium">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedFaq === index && (
                    <div className="px-4 py-4 bg-white/2">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Office Information */}
        <div className="bg-[#333333]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mt-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Our Commitment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#007BFF]/20 rounded-full mb-4 mx-auto">
                <MapPin className="w-8 h-8 text-[#007BFF]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Global Reach
              </h3>
              <p className="text-gray-400">
                Supporting sustainable commerce worldwide, connecting
                eco-conscious buyers and sellers across communities.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#007BFF]/20 rounded-full mb-4 mx-auto">
                <Clock className="w-8 h-8 text-[#007BFF]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-400">
                Our dedicated team is always here to help you with your
                sustainable shopping journey and platform questions.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#007BFF]/20 rounded-full mb-4 mx-auto">
                <Building className="w-8 h-8 text-[#007BFF]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Trusted Platform
              </h3>
              <p className="text-gray-400">
                Building a secure, reliable marketplace where sustainability
                meets convenience for millions of users.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Ready to start your sustainable shopping journey?
          </p>
          <button className="bg-[#007BFF] hover:bg-[#005FCC] text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Explore EcoFinds Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}
