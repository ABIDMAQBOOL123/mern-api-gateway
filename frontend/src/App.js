// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [isLogin, setIsLogin] = useState(true);
//   const [token, setToken] = useState('');
//   const [products, setProducts] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     const url = isLogin ? '/api/auth/login' : '/api/auth/register';
//     try {
//       const res = await axios.post(url, formData);
//       if (isLogin) {
//         setToken(res.data.token);
//         localStorage.setItem('token', res.data.token);
//       }
//       alert(isLogin ? 'Login successful!' : 'Registration successful!');
//     } catch (err) {
//       alert(err.response?.data?.error || 'Something went wrong');
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('/api/products', {
//         headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` }
//       });
//       setProducts(res.data);
//     } catch (err) {
//       alert(err.response?.data?.error || 'Failed to fetch products');
//     }
//   };

//   return (
//     <div>
//       <h1>{isLogin ? 'Login' : 'Register'}</h1>
//       <form onSubmit={handleAuth}>
//         <input
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         {!isLogin && (
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//         )}
//         <input
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//       </form>
//       <button onClick={() => setIsLogin(!isLogin)}>
//         Switch to {isLogin ? 'Register' : 'Login'}
//       </button>

//       <hr />

//       <h2>Products</h2>
//       <button onClick={fetchProducts}>Fetch Products</button>
//       <ul>
//         {products.map(product => (
//           <li key={product._id}>{product.name} - ${product.price}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';

import Register from './components/Register';
import Products from './components/Products';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
