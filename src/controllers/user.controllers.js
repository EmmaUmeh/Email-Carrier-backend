const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const emailRegex = /^[a-zA-Z0-9._%+-]+@twilio\.com$/;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email is in a valid format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address. Email must end with @twilio.com" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ msg: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration Failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
