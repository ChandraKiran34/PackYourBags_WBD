import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Traveller from '../models/Traveller.js';
import Trip from '../models/Trip.js';


// Controller function to register a new traveller
export const registerTraveller = async (req, res) => {
  try {
    // Extract user input from request body
    const { name, email, password, phoneNumber,address } = req.body;

    // Check if email is already registered
    let existingTraveller = await Traveller.findOne({ email });
    if (existingTraveller) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Hash the password with the salt
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new Traveller instance
    const newTraveller = new Traveller({
      name,
      email,
      password: passwordHash,
      phoneNumber,
      address
    });

    // Save the new traveller to the database
    await newTraveller.save();

    res.status(201).json({ message: 'Traveller registered successfully' });
  } catch (error) {
    console.error('Error registering traveller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to login a traveller
export const loginTraveller = async (req, res) => {
  try {
    // Extract user input from request body
    const { email, password } = req.body;

    // Check if the traveller exists
    const traveller = await Traveller.findOne({ email });
    if (!traveller) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, traveller.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: traveller._id,role:"user" },process.env.JWT_SECRET, { expiresIn: '1h' });
    let user = traveller;
    console.log(user)
    res.status(200).json({user, token });
  } catch (error) {
    console.error('Error logging in traveller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Function to get traveller details by ID
export const getTravellerDetails = async (req, res) => {
  try {
    // Retrieve traveller ID from route parameters
    const { travellerId } = req.params;

    // Check if traveller ID is provided
    if (!travellerId) {
      return res.status(400).json({ message: 'Traveller ID is required' });
    }

    // Find the traveller by ID in the database
    console.log(travellerId)
    const traveller = await Traveller.findById(travellerId);

    if (!traveller) {
      return res.status(404).json({ message: 'Traveller not found' });
    }
    console.log(traveller)

    res.status(200).json(traveller);
  } catch (error) {
    console.error('Error fetching traveller details:', error);
    res.status(500).json({ error: 'Failed to fetch traveller details' });
  }
};


// Function to get booking details by traveller ID
export const getBookingDetailsByTravellerId = async (req, res) => {
  try {
    // Retrieve traveller ID from route parameters
    const { travellerId } = req.params;

    // Check if traveller ID is provided
    if (!travellerId) {
      return res.status(400).json({ message: 'Traveller ID is required' });
    }

    // Find all trips with matching traveller ID
    const bookings = await Trip.find({ travellerId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for the traveller' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Failed to fetch booking details' });
  }
}

// Function to update traveller details by ID
export const updateTravellerDetailsById = async (req, res) => {
  try {
    // Retrieve traveller ID from route parameters
    const { travellerId } = req.params;

    // Check if traveller ID is provided
    if (!travellerId) {
      return res.status(400).json({ message: 'Traveller ID is required' });
    }

    // Extract updated details from request body
    const { name, phoneNumber,address} = req.body;

    // Hash the password if provided
    // let hashedPassword;
    // if (password) {
    //   const salt = await bcrypt.genSalt();
    //   hashedPassword = await bcrypt.hash(password, salt);
    // }

    // Construct update object based on provided fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    // if (hashedPassword) updateFields.password = hashedPassword;
    if (address) updateFields.address = address;

    // Find the traveller by ID in the database and update details
    const updatedTraveller = await Traveller.findByIdAndUpdate(travellerId, updateFields, { new: true });

    if (!updatedTraveller) {
      return res.status(404).json({ message: 'Traveller not found' });
    }

    res.status(200).json(updatedTraveller);
  } catch (error) {
    console.error('Error updating traveller details:', error);
    res.status(500).json({ error: 'Failed to update traveller details' });
  }
};




