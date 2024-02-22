import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Guide from "../models/Guide.js";

// Controller function to register a new guide
export async function registerGuide(req, res) {
  try {
    // Extract user input from request body
    const { name, email, password, phoneNumber, location } = req.body;

    // Check if email is already registered
    let existingGuide = await Guide.findOne({ email });
    if (existingGuide) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Hash the password with the salt
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new Guide instance
    const newGuide = new Guide({
      name,
      email,
      password: passwordHash,
      phoneNumber,
      location,
    });

    // Save the new guide to the database
    await newGuide.save();

    res.status(201).json({ message: "Guide registered successfully" });
  } catch (error) {
    console.error("Error registering guide:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to login a guide
export async function loginGuide(req, res) {
  try {
    // Extract user input from request body
    const { email, password } = req.body;

    // Check if the guide exists
    const guide = await Guide.findOne({ email });
    if (!guide) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, guide.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: guide._id, role: "guide" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in guide:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to get traveller details by ID
export const getGuideDetails = async (req, res) => {
  try {
    // Retrieve traveller ID from route parameters
    const { guideId } = req.params;

    // Check if traveller ID is provided
    if (!guideId) {
      return res.status(400).json({ message: "guide ID is required" });
    }

    // Find the traveller by ID in the database
    console.log(guideId);
    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: "guide not found" });
    }
    console.log(guide);

    res.status(200).json(guide);
  } catch (error) {
    console.error("Error fetching traveller details:", error);
    res.status(500).json({ error: "Failed to fetch traveller details" });
  }
};

// Function to update guide details by ID
export const updateGuideDetailsById = async (req, res) => {
  try {
    // Retrieve guide ID from route parameters
    const { guideId } = req.params;

    console.log(guideId,"Hello")

    // Check if guide ID is provided
    if (!guideId) {
      return res.status(400).json({ message: "Guide ID is required" });
    }

    // Extract updated details from request body
    const { name, phoneNumber, location } = req.body;
    // Hash the password if provided
    // let hashedPassword;
    // if (password) {
    //   const salt = await bcrypt.genSalt();
    //   hashedPassword = await bcrypt.hash(password, salt);
    // }

    console.log(name)
    console.log(phoneNumber)
    // console.log(password)

    // Construct update object based on provided fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    // if (hashedPassword) updateFields.password = hashedPassword;
    if (location) updateFields.location = location;

    // Find the guide by ID in the database and update details
    const updatedGuide = await Guide.findByIdAndUpdate(guideId, updateFields, {
      new: true,
    });

    if (!updatedGuide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.status(200).json(updatedGuide);
  } catch (error) {
    console.error("Error updating guide details:", error);
    res.status(500).json({ error: "Failed to update guide details" });
  }
};
