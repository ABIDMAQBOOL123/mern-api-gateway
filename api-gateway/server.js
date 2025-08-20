const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Service URLs
const SERVICES = {
  auth: 'http://localhost:3001',
  products: 'http://localhost:3002',
  users: 'http://localhost:3003'
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
    '^/api/products': '/products'   // forward correctly
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});