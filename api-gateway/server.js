require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());



// Service URLs
const SERVICES = {
  auth:  process.env.AUTH_SERVICE,
  products: process.env.PRODUCTS_SERVICE,
  users: process.env.USERS_SERVICE,
};

// Authentication routes - direct to auth service
app.use('/api/auth', createProxyMiddleware({
  target: SERVICES.auth,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': ''
  }
}));

// Products routes
// app.use('/api/products', createProxyMiddleware({
//   target: SERVICES.products,
//   changeOrigin: true,
// //   pathRewrite: {
// //     '^/api/products': '/products'
// //   }
// }));

app.use('/api/products', createProxyMiddleware({
  target: SERVICES.products,
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': ''   // forward correctly
  }
}));


// Debug middleware – log every request
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.url}`);
  next();
});

// Users routes
app.use('/api/users', createProxyMiddleware({
  target: SERVICES.users,
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/users'
  }
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Service unavailable' });
});

const PORT = process.env.PORT ;

app.listen(PORT, '0.0.0.0',  () => {
  console.log(`API Gateway running on port ${PORT}`);
});