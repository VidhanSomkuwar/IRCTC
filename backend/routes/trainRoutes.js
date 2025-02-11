import express from 'express';
import { verifyApiKey } from '../middleware/adminMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
  addTrain, 
  updateSeats, 
  getAvailableTrains 
} from '../controllers/trainController.js';

const router = express.Router();

router.post('/admin/add-train', verifyApiKey, addTrain);
router.put('/admin/update-seats/:trainId', verifyApiKey, updateSeats);
router.get('/trains', getAvailableTrains);

export default router;