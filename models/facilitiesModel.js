const mongoose = require('mongoose')

const facilitiesSchema = mongoose.Schema({
  bathroom: {
    seperate: {
      type: Boolean,
      required: true,
      default: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  bedroom: {
    type: Number,
    required: true,
    default: 1,
  },
  electricWaterHeater: {
    type: Boolean,
    required: true,
    default: true,
  },
  kitchen: {
    type: String,
    enum: ['Bếp riêng', 'Bếp chung', 'Không có bếp'],
    required: true,
    default: 'closed',
  },
  airConditioner: {
    type: Boolean,
    required: true,
    default: true,
  },
  balcony: {
    type: Boolean,
    required: true,
    default: true,
  },
  waterPrice: {
    type: Number,
    required: true,
  },
  electricityPrice: {
    type: Number,
    required: true,
  },
  washingMachine: {
    type: Boolean,
    default: false,
  },
  fridge: {
    type: Boolean,
    default: false,
  },
  otherFacilities: {
    type: String,
  },
})

module.exports = mongoose.model('facilities', facilitiesSchema)
