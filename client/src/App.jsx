import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import UserDashboard from "./pages/UserDashboard";
import MyListing from "./pages/MyListing";
import MyPurchase from "./pages/MyPurchase";

// ProtectedRoute → only for authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

// RedirectAuthenticatedUser → stops logged-in users from visiting /login or /signup
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return null; // nothing until auth check completes

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] relative text-[#FFFFFF]">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />

          {/* Auth routes */}
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

          {/* Email verification */}
          <Route path="/verify-email" element={<EmailVerificationPage />} />

          {/* Password reset */}
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

          {/* Protected routes */}
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

      {/* Notifications */}
      <Toaster
        toastOptions={{
          style: {
            background: "#33333380", // same as bg-[#333333]/50
            backdropFilter: "blur(10px)",
            color: "#FFFFFF",
          },
        }}
      />
    </div>
  );
};

export default App;
