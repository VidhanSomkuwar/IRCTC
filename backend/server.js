import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });  // ✅ Ensures correct path


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', trainRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;

// Sync database and start server
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });