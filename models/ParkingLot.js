const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParkingSlotSchema = new Schema({
  size: {
    type: Number,
    required: true
  },
  empty: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true,
  }
})

const ParkingLotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  spaces: {
    type: [ParkingSlotSchema],
    required: true,
    default: []
  },
});

module.exports = mongoose.model('parking-lots', ParkingLotSchema);
