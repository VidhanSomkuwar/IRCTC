import { Sequelize } from "sequelize";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🔍 DATABASE_URL:", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false, 
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize;
