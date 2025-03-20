const Transaction = require('../models/transaction.model');
const generateInvoiceNumber = require('../utils/generateInvoiceNumber');

exports.createTransaction = async (req, res) => {
    try {  
      const invoiceNumber = generateInvoiceNumber();
      const {
        customerName,
        items,
        cash,
        totalPrice,
        cashBack
      } = req.body;

      // Validasi input
      if (!customerName || !items || !totalPrice || !cashBack || !cash) {
        return res.status(400).json({
          message: 'customer name, items, cash, cashback and total price are required'
        });
      }
  
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          message: 'Items must be a non-empty array'
        });
      }
  
      // Validasi setiap item
      for (const item of items) {
        if (!item.name || !item.quantity || !item.price) {
          return res.status(400).json({
            message: 'Each item must have name, quantity, and price'
          });
        }
      }
  
      // Buat transaksi baru
      const newTransaction = new Transaction({
        invoiceNumber,
        customerName, 
        items,
        cash,
        totalPrice,
        cashBack
      });
  
      // Simpan ke database
      const savedTransaction = await newTransaction.save();
  
      res.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        data: savedTransaction
      });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create transaction',
        error: error.message
      });
    }
  };

exports.getAllTransactions = async (req, res) => {
  try {
    // Ambil semua data transaksi dan urutkan dari yang terbaru
    const transactions = await Transaction.find().sort('-createdAt');

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transactions',
      error: error.message
    });
  }
};

exports.getSevenDayTransactions = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const transactions = await Transaction.find({
      createdAt: { $gte: sevenDaysAgo, $lte: new Date() }
    }).sort({ createdAt: -1 }); 

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transactions',
      error: error.message
    });
  }
}

exports.getTodayTransactions = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);

    const transactions = await Transaction.find({
      createdAt: { 
        $gte: startOfDay, 
        $lt: endOfDay
      }
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transactions',
      error: error.message
    });
  }
};