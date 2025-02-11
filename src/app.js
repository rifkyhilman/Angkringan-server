const express = require('express');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/', (req, res) => {
    return res.send("Hello Angkringan !");
});

module.exports = app;