const express = require('express');
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
app.get ('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../index.html'));
});
app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);

module.exports = app;