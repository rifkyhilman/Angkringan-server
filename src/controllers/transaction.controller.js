exports.createTransaction = async (req, res) => {
    try {
      const {
        invoiceNumber,
        customerName,
        items,
        totalPrice
      } = req.body;
  
      // Validasi input
      if (!invoiceNumber || !customerName || !items || !totalPrice) {
        return res.status(400).json({
          message: 'Invoice number, customer name, items, and total price are required'
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
        totalPrice
      });
  
      // Simpan ke database
    //   const savedTransaction = await newTransaction.save();
  
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