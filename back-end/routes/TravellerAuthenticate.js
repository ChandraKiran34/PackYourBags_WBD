import express from 'express';
import { registerTraveller, loginTraveller, updateTravellerDetailsById, getBookingDetailsByTravellerId, getTravellerDetails } from '../controllers/travellerController.js';
import { verifyToken } from '../middleware/travelAuth.js';
import { getBookingDetailsByHotelId, getHotelDetails, updateHotelDetailsById } from '../controllers/hotelController.js';
const router = express.Router();

// Register a new traveller
router.post('/register', registerTraveller);

// Login a traveller
router.post('/login', loginTraveller);


// Protected routes - require authentication
router.use(verifyToken);


// Get traveller details by ID (dashboard)
router.get('/:hotelId/dashboard', getHotelDetails);

// Update traveller details by ID
router.put('/:hotelId/update', updateHotelDetailsById);

// Get booking details by traveller ID
router.get('/:hotelId/bookings', getBookingDetailsByHotelId);

export default router;
