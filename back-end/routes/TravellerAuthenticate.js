import express from 'express';
import { registerTraveller, loginTraveller, updateTravellerDetailsById, getBookingDetailsByTravellerId, getTravellerDetails } from '../controllers/travellerController.js';
import { verifyToken } from '../middleware/travelAuth.js';
const router = express.Router();

// Register a new traveller
router.post('/register', registerTraveller);

// Login a traveller
router.post('/login', loginTraveller);


// Protected routes - require authentication
router.use(verifyToken);


// Get traveller details by ID (dashboard)
router.get('/:travellerId/dashboard', getTravellerDetails);

// Update traveller details by ID
router.put('/:travellerId/update', updateTravellerDetailsById);

// Get booking details by traveller ID
router.get('/:travellerId/bookings', getBookingDetailsByTravellerId);

export default router;
