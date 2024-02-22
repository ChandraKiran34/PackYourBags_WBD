import mongoose from 'mongoose';

const travellerSchema = new mongoose.Schema({
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
  address:{
    type:String,
    required:true
  }
});

const Traveller = mongoose.model('Traveller', travellerSchema);

export default Traveller;
