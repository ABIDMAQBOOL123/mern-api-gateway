// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/login', formData);
//       localStorage.setItem('token', res.data.token);
//       alert('Login successful!');
//       navigate('/products');
//     } catch (err) {
//       alert(err.response?.data?.error || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8">
//       <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//           className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
//           Login
//         </button>
//       </form>
//       <p className="text-center mt-4 text-sm">
//         Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mt: 8 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, py: 1.2 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
