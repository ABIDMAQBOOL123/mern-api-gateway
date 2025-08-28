// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function Products() {
// //   const [products, setProducts] = useState([]);

// //   const fetchProducts = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const res = await axios.get('/api/products', {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setProducts(res.data);
// //     } catch (err) {
// //       alert(err.response?.data?.error || 'Failed to fetch products');
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
// //       <h2 className="text-2xl font-bold mb-4">Products</h2>
// //       <button
// //         onClick={fetchProducts}
// //         className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
// //       >
// //         Fetch Products
// //       </button>
// //       <ul className="mt-4 space-y-2">
// //         {products.map(product => (
// //           <li key={product._id} className="border-b py-2 flex justify-between">
// //             <span>{product.name}</span>
// //             <span className="font-semibold">${product.price}</span>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default Products;


// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Divider,
// } from "@mui/material";

// function Products() {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(res.data);
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to fetch products");
//     }
//   };


  

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Products
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={fetchProducts}
//           sx={{ mb: 2 }}
//         >
//           Fetch Products
//         </Button>

//         <List>
//           {products.map((product, index) => (
//             <React.Fragment key={product._id}>
//               <ListItem
//                 secondaryAction={
//                   <Typography fontWeight="bold">
//                     ${product.price}
//                   </Typography>
//                 }
//               >
//                 <ListItemText primary={product.name} />
//               </ListItem>
//               {index !== products.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </List>
//       </Paper>
//     </Container>
//   );
// }

// export default Products;



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  TextField,
  Box,
} from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch products");
    }
  };

  // Add new product
  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/products", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, res.data]); // append new product
      setForm({ name: "", price: "", description: "" }); // reset form
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add product");
    }
  };

  // ✅ useEffect to fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // empty dependency → runs once

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 ,  mt: 4}}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Products
        </Typography>

        {/* Form to Add Product */}
        <Box display="flex" flexDirection="column" gap={2} mb={3}>
          <TextField
            label="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            label="Description"
            multiline
            rows={2}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <Button variant="contained" color="secondary" onClick={addProduct}>
            Add Product
          </Button>
        </Box>

        {/* Fetch Products Button (optional now, but useful for manual refresh) */}
        <Button
          variant="contained"
          color="primary"
          onClick={fetchProducts}
          sx={{ mb: 2 }}
        >
          Refresh Products
        </Button>

        {/* Product List */}
        <List>
          {products.map((product, index) => (
            <React.Fragment key={product._id}>
              <ListItem
                secondaryAction={
                  <Typography fontWeight="bold">${product.price}</Typography>
                }
              >
                <ListItemText
                  primary={product.name}
                  secondary={product.description}
                />
              </ListItem>
              {index !== products.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Products;
