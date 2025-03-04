const express = require('express');
const { createTransaction } = require('../controllers/transaction.controller');

const router = express.Router();

router.get('/transaction', createTransaction);

module.exports = router;