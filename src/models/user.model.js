const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Array, default: ['Cashier'] }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
