import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  picturePath: {
    type: String,
    required: true
  },
  placesToVisit: [String] // Array of strings representing names of places to visit
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
