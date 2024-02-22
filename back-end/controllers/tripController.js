import Trip from '../models/Trip.js';

// Controller function to create a new trip
export const createTrip = async (req, res) => {
  try {
    const { travellerId, guideId, hotelId, agencyId, destinationId, status, dates, days } = req.body;

    // Create a new trip object
    const newTrip = new Trip({
      travellerId,
      guideId,
      hotelId,
      agencyId,
      destinationId,
      status,
      dates,
      days
    });

    // Save the new trip to the database
    const createdTrip = await newTrip.save();

    res.status(201).json(createdTrip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
};
