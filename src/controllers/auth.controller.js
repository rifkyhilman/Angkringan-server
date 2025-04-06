const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ error: "Nama, Email atau Password tidak boleh kosong !" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res
        .status(400)
        .json({ error: "Email atau Password tidak boleh kosong !" });
      return;
    }
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Akun Tidak Terdaftar !' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password Anda Salah !' });

    // Generate Token
    const token = jwt.sign({ id: user._id, username:user.username, role: user.role.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });


    res.status(200).json({ 
      accesToken: token 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
