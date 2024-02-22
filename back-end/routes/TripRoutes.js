import express from 'express';
import { createTrip } from '../controllers/tripController.js';

const router = express.Router();

// Route to create a new trip
router.post('/', createTrip);

export default router;
