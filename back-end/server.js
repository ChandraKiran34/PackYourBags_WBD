import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/TravellerAuthenticate.js';
import guideRoutes  from './routes/GuideAuthenticate.js';
import hotelRoutes  from './routes/HotelAuthenticate.js';
import agencyRoutes from './routes/AgencyAuthenticate.js'
import destinationRoutes  from './routes/DestinationRoute.js';
import tripRoutes from './routes/TripRoutes.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File upload
app.use('/auth', authRoutes);
app.use('/guide',guideRoutes);
app.use('/hotel',hotelRoutes);
app.use('/agency',agencyRoutes);
app.use('/destinations',destinationRoutes);
app.use('/trips', tripRoutes);



const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`));
  })
  .catch((err) => console.log(`error : ${err}`));
