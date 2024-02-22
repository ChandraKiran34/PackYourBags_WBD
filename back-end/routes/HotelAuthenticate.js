import express from 'express';
import { registerHotel, loginHotel } from '../controllers/hotelController.js';

const router = express.Router();

// Route to register a new hotel
router.post('/register', registerHotel);

// Route to login a hotel
router.post('/login', loginHotel);

export  default router ;
