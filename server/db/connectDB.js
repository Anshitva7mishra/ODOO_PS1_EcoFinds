import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

export const sql = neon(process.env.DATABASE_URL);

export const connectDB = async () => {
  try {
    // Just run a test query to ensure connection
    const result = await sql`SELECT NOW()`;
    console.log("✅ Neon Postgres Connected:", result[0].now);
  } catch (error) {
    console.error("❌ Error connecting to Neon:", error.message);
    process.exit(1);
  }
};
