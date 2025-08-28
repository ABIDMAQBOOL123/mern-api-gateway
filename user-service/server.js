require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Profile Model
const UserProfile = mongoose.model('UserProfile', new mongoose.Schema({
  userId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  address: String
}));

// Routes
app.get('/users/:id', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.id });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {
     console.log("[DEBUG] Inside POST /api/users with body:", req.body);
  try {
    const profile = new UserProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});