const mongoose = require('mongoose');
// Your MongoDB URI, change this to your actual URI
require('dotenv').config();

const Mongourl = process.env.MONGO_URI;

const connectToDatabase = () => {
  mongoose.connect(Mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

module.exports = { connectToDatabase };
