require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const streamService = require('../api-gateway/services/streamservice')

const app = express();

// Middleware
app.use(cors());
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Product Model
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number,
  description: String
}));


app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  res.write(":\n\n"); // keep-alive ping

  const clientId = streamService.addClient(res);

  req.on('close', () => {
    streamService.removeClient(clientId);
  });
});

// Routes
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({name, price, description});
    await product.save();
    streamService.broadcast({
          type: 'products',
          message: `New product added: ${name}`,
          product
        });
        console.log(product)
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT 
// console.log(PORT)
// console.log(process.env.MONGO_URI)
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});


