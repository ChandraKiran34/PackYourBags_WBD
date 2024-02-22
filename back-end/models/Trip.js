import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  travellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Traveller',
    required: true
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide'
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency'
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'travelled'],
    default: 'booked'
  },
  dates: {
    type: [Date],
    required: true
  },
  days: {
    type: Number,
    required: true
  }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
