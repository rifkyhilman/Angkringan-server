const express = require('express');
const { history } = require('../controllers/transaction.controller');

const router = express.Router();

router.get('/history', history);

module.exports = router;