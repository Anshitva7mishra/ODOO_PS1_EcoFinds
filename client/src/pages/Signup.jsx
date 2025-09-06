import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full rounded-2xl shadow-xl overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0f0f0f, #1a1a1a)",
      }}
    >
      <div className="p-8 flex flex-col items-center">
        {/* Title */}
        <h2
          className="text-3xl font-bold text-center bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
          }}
        >
          Create Account
        </h2>

        {/* App name */}
        <p
          className="text-xl font-bold text-center bg-clip-text text-transparent mt-1"
          style={{
            backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
          }}
        >
          EcoFinds
        </p>

        {/* Form */}
        <form onSubmit={handleSignUp} className="mt-6 w-full">
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="font-semibold mt-2" style={{ color: "#EF4444" }}>
              {error}
            </p>
          )}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-5 w-full py-3 px-4 font-bold rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "linear-gradient(to right, #007BFF, #005FCC)",
              color: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>

      {/* Footer */}
      <div
        className="px-8 py-4 flex justify-center"
        style={{ background: "#33333380" }}
      >
        <p style={{ color: "#9CA3AF" }} className="text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            style={{ color: "#007BFF" }}
            className="hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
