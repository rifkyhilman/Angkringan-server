const express = require('express');
const { createTransaction, getAllTransactions, getSevenDayTransactions, getTodayTransactions} = require('../controllers/transaction.controller');
const router = express.Router();

router.get('/transaction', getAllTransactions);
router.get('/transaction/sevenday', getSevenDayTransactions);
router.get('/transaction/today', getTodayTransactions);
router.post('/transaction', createTransaction);

module.exports = router;