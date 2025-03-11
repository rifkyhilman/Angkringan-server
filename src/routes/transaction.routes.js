const express = require('express');
const { createTransaction, getAllTransactions } = require('../controllers/transaction.controller');
const router = express.Router();

router.get('/transaction', getAllTransactions);
router.post('/transaction', createTransaction);

module.exports = router;