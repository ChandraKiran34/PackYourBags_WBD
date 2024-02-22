import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Agency from '../models/Agency.js';

// Controller function to register a new agency
export const registerAgency = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, numberOfVehiclesAvailable, location } = req.body;

    // Check if email is already registered
    let existingAgency = await Agency.findOne({ email });
    if (existingAgency) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new Agency instance with hashed password
    const newAgency = new Agency({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      numberOfVehiclesAvailable,
      location
    });

    // Save the new agency to the database
    await newAgency.save();

    res.status(201).json({ message: 'Agency registered successfully' });
  } catch (error) {
    console.error('Error registering agency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to login an agency
export const loginAgency = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if agency exists with the given email
    const agency = await Agency.findOne({ email });
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, agency.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: agency._id, email: agency.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in agency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get agency details by ID
export const getAgencyDetails = async (req, res) => {
    try {
      // Retrieve agency ID from route parameters
      const { agencyId } = req.params;
  
      // Check if agency ID is provided
      if (!agencyId) {
        return res.status(400).json({ message: 'Agency ID is required' });
      }
  
      // Find the agency by ID in the database
      const agency = await Agency.findById(agencyId);
  
      if (!agency) {
        return res.status(404).json({ message: 'Agency not found' });
      }
  
      res.status(200).json(agency);
    } catch (error) {
      console.error('Error fetching agency details:', error);
      res.status(500).json({ error: 'Failed to fetch agency details' });
    }
  };
  
  
  // Function to get booking details by agency ID
  export const getBookingDetailsByAgencyId = async (req, res) => {
    try {
      // Retrieve agency ID from route parameters
      const { agencyId } = req.params;
  
      // Check if agency ID is provided
      if (!agencyId) {
        return res.status(400).json({ message: 'Agency ID is required' });
      }
  
      // Find all trips with matching agency ID
      const bookings = await Trip.find({ agencyId });
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for the agency' });
      }
  
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      res.status(500).json({ error: 'Failed to fetch booking details' });
    }
  }
  
  // Function to update agency details by ID
  export const updateAgencyDetailsById = async (req, res) => {
    try {
      // Retrieve agency ID from route parameters
      const { agencyId } = req.params;
  
      // Check if agency ID is provided
      if (!agencyId) {
        return res.status(400).json({ message: 'Agency ID is required' });
      }
  
      // Extract updated details from request body
      const { name, phoneNumber, numberOfVehiclesAvailable ,location} = req.body;
  
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
      if (numberOfVehiclesAvailable) updateFields.numberOfVehiclesAvailable = numberOfVehiclesAvailable;
      if (location) updateFields.location = location;
  
      // Find the agency by ID in the database and update details
      const updatedAgency = await Agency.findByIdAndUpdate(agencyId, updateFields, { new: true });
  
      if (!updatedAgency) {
        return res.status(404).json({ message: 'Agency not found' });
      }
  
      res.status(200).json(updatedAgency);
    } catch (error) {
      console.error('Error updating agency details:', error);
      res.status(500).json({ error: 'Failed to update agency details' });
    }
  };