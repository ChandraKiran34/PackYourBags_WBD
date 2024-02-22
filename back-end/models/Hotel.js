import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    numberOfRoomsAvailable: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  });
  
  const Hotel = mongoose.model('Hotel', hotelSchema);
  
  export default Hotel;