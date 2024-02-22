import express from 'express';
import { registerAgency, loginAgency } from '../controllers/agencyController.js';

const router = express.Router();

// Route to register a new agency
router.post('/register', registerAgency);

// Route to login an agency
router.post('/login', loginAgency);

export default router;
