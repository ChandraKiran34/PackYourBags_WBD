import express from 'express';
import { createDestination } from '../controllers/destinationController.js';

const router = express.Router();

import multer from 'multer';
// import {storage} from '../cloudinary'
// const upload = multer({storage});

// Route to create a new destination
// router.post('/',upload.single("image"), createDestination);

export default router;
