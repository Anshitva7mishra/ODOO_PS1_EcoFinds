import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { useAuthStore } from "./store/authStore";

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
import Footer from "./components/Footers";

// ---------- ProtectedRoute ----------
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.is_verified) return <Navigate to="/verify-email" replace />;
  return children;
};

// ---------- RedirectAuthenticatedUser ----------
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) return null;
  if (isAuthenticated && user?.is_verified) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const currentLocation = useLocation();

  const getLocation = async () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const response = await axios.get(url, { withCredentials: false });
          setLocation(response.data.address);
          setOpenDropdown(false);
        } catch (error) {
          console.log("Error fetching location data:", error);
        }
      },
      (err) => {
        console.log("User denied geolocation or error occurred:", err);
      }
    );
  };

  useEffect(() => {
    checkAuth();
    getLocation();
  }, [checkAuth]);

  if (isCheckingAuth) return null;

  // Hide navbar/footer on these routes
  const hideNavbarFooter = ["/login", "/signup", "/user-dashboard"].includes(
    currentLocation.pathname
  );

  // Center content vertically on login/signup
  const centerContent = ["/login", "/signup"].includes(currentLocation.pathname);

  return (
    <CartProvider>
      <DataProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">
          {/* Navbar */}
          {!hideNavbarFooter && (
            <Navbar
              location={location}
              getLocation={getLocation}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          )}

          {/* Page Content */}
          <main
            className={`flex-1 w-full ${
              centerContent ? "flex items-center justify-center" : ""
            }`}
          >
            <Routes>
              {/* Public Routes */}
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

              {/* Protected Routes */}
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
          </main>

          {/* Footer */}
          {!hideNavbarFooter && <Footer />}

          {/* Toast Notifications */}
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
      </DataProvider>
    </CartProvider>
  );
};

export default App;