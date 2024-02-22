import express  from 'express';
const router = express.Router();
import { registerGuide, loginGuide,getGuideDetails } from '../controllers/guideController.js';
import { verifyToken } from '../middleware/travelAuth.js';

// Route to register a new guide
router.post('/register', registerGuide);

// Route to login a guide
router.post('/login', loginGuide);

router.use(verifyToken)

// Get guide details by ID (dashboard)
router.get('/:guideId/dashboard', getGuideDetails);

export default router;
