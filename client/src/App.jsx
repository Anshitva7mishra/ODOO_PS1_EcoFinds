import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import UserDashboard from "./pages/UserDashboard";
import MyListing from "./pages/MyListing";
import MyPurchase from "./pages/MyPurchase";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ProtectedRoute → only for authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null; // wait until auth check finishes
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.is_verified) return <Navigate to="/verify-email" replace />;

  return children;
};

// RedirectAuthenticatedUser → stops logged-in & verified users from visiting /login or /signup
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;
  if (isAuthenticated && user?.is_verified) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  // ------------------ ADDED LOCATION LOGIC ------------------
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const response = await axios.get(url);
        const exactLocation = response.data.address;
        setLocation(exactLocation);
        setOpenDropdown(false);
        console.log(exactLocation);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    checkAuth();
    getLocation();
  }, [checkAuth]);
  // ------------------------------------------------------------

  if (isCheckingAuth) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] relative text-white">
      {/* Navbar with location props */}
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <div className="flex items-center justify-center min-h-screen px-4">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <Signup />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />

          {/* Protected */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listing"
            element={
              <ProtectedRoute>
                <MyListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-purchases"
            element={
              <ProtectedRoute>
                <MyPurchase />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />

      {/* Notifications */}
      <Toaster
        toastOptions={{
          style: {
            background: "#33333380",
            backdropFilter: "blur(10px)",
            color: "#FFFFFF",
          },
        }}
      />
    </div>
  );
};

export default App;
