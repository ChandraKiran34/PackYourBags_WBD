import express from 'express';
import { registerHotel, loginHotel } from '../controllers/hotelController.js';

const router = express.Router();

// Route to register a new hotel
router.post('/register', registerHotel);

// Route to login a hotel
router.post('/login', loginHotel);

router.use(verifyToken);


// Get traveller details by ID (dashboard)
router.get('/:travellerId/dashboard', getTravellerDetails);

// Update traveller details by ID
router.put('/:travellerId/update', updateTravellerDetailsById);

// Get booking details by traveller ID
router.get('/:travellerId/bookings', getBookingDetailsByTravellerId);

export  default router ;
