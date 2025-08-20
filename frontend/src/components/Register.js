// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/auth/register', formData);
//       alert('Registration successful!');
//       navigate('/login');
//     } catch (err) {
//       alert(err.response?.data?.error || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8">
//       <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//       <form onSubmit={handleRegister} className="space-y-4">
//         <input
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//           className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
//         />
//         <input
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
//         />
//         <input
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
//         />
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
//           Register
//         </button>
//       </form>
//       <p className="text-center mt-4 text-sm">
//         Already have an account? <Link to="/login" className="text-green-600">Login</Link>
//       </p>
//     </div>
//   );
// }

// export default Register;



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

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mt: 8 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
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
            label="Email"
            type="email"
            name="email"
            value={formData.email}
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
            color="success"
            sx={{ mt: 3, py: 1.2 }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2e7d32", textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;

