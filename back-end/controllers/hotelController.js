import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Hotel from '../models/Hotel.js';

// Controller function to register a new hotel
export const registerHotel = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, numberOfRoomsAvailable, location } = req.body;

    // Check if email is already registered
    let existingHotel = await Hotel.findOne({ email });
    if (existingHotel) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new Hotel instance with hashed password
    const newHotel = new Hotel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      numberOfRoomsAvailable,
      location
    });

    // Save the new hotel to the database
    await newHotel.save();

    res.status(201).json({ message: 'Hotel registered successfully' });
  } catch (error) {
    console.error('Error registering hotel:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to login a hotel
export const loginHotel = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if hotel exists with the given email
    const hotel = await Hotel.findOne({ email });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, hotel.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: hotel._id, email: hotel.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in hotel:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get hotel details by ID
export const getHotelDetails = async (req, res) => {
    try {
      // Retrieve hotel ID from route parameters
      const { hotelId } = req.params;
  
      // Check if hotel ID is provided
      if (!hotelId) {
        return res.status(400).json({ message: 'Hotel ID is required' });
      }
  
      // Find the hotel by ID in the database
      const hotel = await Hotel.findById(hotelId);
  
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      res.status(200).json(hotel);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      res.status(500).json({ error: 'Failed to fetch hotel details' });
    }
  };
  
  
  // Function to get booking details by hotel ID
  export const getBookingDetailsByHotelId = async (req, res) => {
    try {
      // Retrieve hotel ID from route parameters
      const { hotelId } = req.params;
  
      // Check if hotel ID is provided
      if (!hotelId) {
        return res.status(400).json({ message: 'Hotel ID is required' });
      }
  
      // Find all trips with matching hotel ID
      const bookings = await Trip.find({ hotelId });
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for the hotel' });
      }
  
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      res.status(500).json({ error: 'Failed to fetch booking details' });
    }
  }
  
  // Function to update hotel details by ID
  export const updateHotelDetailsById = async (req, res) => {
    try {
      // Retrieve hotel ID from route parameters
      const { hotelId } = req.params;
  
      // Check if hotel ID is provided
      if (!hotelId) {
        return res.status(400).json({ message: 'Hotel ID is required' });
      }
        // Extract updated details from request body
      const { name, phoneNumber, numberOfRoomsAvailable ,location} = req.body;
  
      // Hash the password if provided
      //  let hashedPassword;
      // if (password) {
      //   const salt = await bcrypt.genSalt();
      //   hashedPassword = await bcrypt.hash(password, salt);
      // }
  
      // Construct update object based on provided fields
      const updateFields = {};
      if (name) updateFields.name = name;
      if (phoneNumber) updateFields.phoneNumber = phoneNumber;
      // if (hashedPassword) updateFields.password = hashedPassword;
      if (numberOfRoomsAvailable) updateFields.numberOfRoomsAvailable = numberOfRoomsAvailable;
      if (location) updateFields.location = location;
  
      // Find the hotel by ID in the database and update details
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateFields, { new: true });
  
      if (!updatedHotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      res.status(200).json(updatedHotel);
    } catch (error) {
      console.error('Error updating hotel details:', error);
      res.status(500).json({ error: 'Failed to update hotel details' });
    }
  };
