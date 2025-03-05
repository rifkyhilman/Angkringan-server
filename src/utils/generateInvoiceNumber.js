const crypto = require('crypto');

const generateInvoiceNumber = () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `INV-${datePart}-${randomPart}`;
  };

module.exports = generateInvoiceNumber;