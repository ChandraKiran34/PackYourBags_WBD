import Destination from '../models/Destination.js';

// Controller function to create a new destination
export const createDestination = async (req, res) => {
  try {
    const picpath = req.file.path;
    const { name, description, location, placesToVisit } = req.body;

    // Create a new destination object
    const newDestination = new Destination({
      name,
      description,
      location,
      picturePath:picpath,
      placesToVisit
    });

    // Save the new destination to the database
    const createdDestination = await newDestination.save();

    res.status(201).json(createdDestination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ error: 'Failed to create destination' });
  }
};
