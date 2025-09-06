import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sql } from "../db/connectDB.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../nodemailer/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const result = await sql`
      INSERT INTO users (email, password, name, verification_token, verification_token_expires_at)
      VALUES (${email}, ${hashedPassword}, ${name}, ${verificationToken}, NOW() + INTERVAL '24 hours')
      RETURNING id, email, name, is_verified;
    `;
    const user = result[0];

    generateTokenAndSetCookie(res, user.id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const result = await sql`
      SELECT * FROM users WHERE verification_token = ${code} 
      AND verification_token_expires_at > NOW();
    `;
    const user = result[0];
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }

    await sql`
      UPDATE users SET is_verified = TRUE, 
      verification_token = NULL, 
      verification_token_expires_at = NULL
      WHERE id = ${user.id};
    `;

    await sendWelcomeEmail(user.email, user.name);

    // Return updated user
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user, is_verified: true },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0];
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    generateTokenAndSetCookie(res, user.id);
    await sql`UPDATE users SET last_login = NOW() WHERE id = ${user.id}`;

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_verified: user.is_verified,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0];
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");

    await sql`
      UPDATE users 
      SET reset_password_token = ${resetToken}, reset_password_expires_at = NOW() + INTERVAL '1 hour'
      WHERE id = ${user.id};
    `;

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({ success: true, message: "Reset link sent" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const result = await sql`
      SELECT * FROM users WHERE reset_password_token = ${token} 
      AND reset_password_expires_at > NOW();
    `;
    const user = result[0];
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}, reset_password_token = NULL, reset_password_expires_at = NULL
      WHERE id = ${user.id};
    `;

    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const result =
      await sql`SELECT id, email, name, is_verified FROM users WHERE id = ${req.userId}`;
    const user = result[0];
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
