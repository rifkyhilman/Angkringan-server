const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');

require('dotenv').config();

const app = express();
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);


module.exports = app;