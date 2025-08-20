const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const streamService = require('../api-gateway/services/streamservice');


const app = express();

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth_service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Model
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
}));

// JWT Secret
const JWT_SECRET = 'abid123';


app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = streamService.addClient(res);

  // Remove client on disconnect
  req.on('close', () => {
    streamService.removeClient(clientId);
  });
});


// Routes
app.post('/register', async (req, res) => {
    console.log(req.body)
  try {
    const { username, email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    streamService.broadcast({
      type: 'register',
      message: `New user registered: ${username}`,
      user: { username, email }
    });
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});