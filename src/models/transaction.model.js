const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  cash: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  cashBack: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // paymentStatus: {
  //   type: String,
  //   enum: ['pending', 'paid', 'failed'],
  //   default: 'pending'
  // },
  // orderStatus: {
  //   type: String,
  //   enum: ['processing', 'completed', 'canceled'],
  //   default: 'processing'
  // },
});

module.exports = mongoose.model('Transaction', transactionSchema);