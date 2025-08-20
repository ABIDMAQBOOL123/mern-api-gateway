// import React, { useState } from 'react';
// import axios from 'axios';

// function Products() {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/products', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProducts(res.data);
//     } catch (err) {
//       alert(err.response?.data?.error || 'Failed to fetch products');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
//       <h2 className="text-2xl font-bold mb-4">Products</h2>
//       <button
//         onClick={fetchProducts}
//         className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
//       >
//         Fetch Products
//       </button>
//       <ul className="mt-4 space-y-2">
//         {products.map(product => (
//           <li key={product._id} className="border-b py-2 flex justify-between">
//             <span>{product.name}</span>
//             <span className="font-semibold">${product.price}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Products;


import React, { useState } from "react";
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
} from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);

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

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchProducts}
          sx={{ mb: 2 }}
        >
          Fetch Products
        </Button>

        <List>
          {products.map((product, index) => (
            <React.Fragment key={product._id}>
              <ListItem
                secondaryAction={
                  <Typography fontWeight="bold">
                    ${product.price}
                  </Typography>
                }
              >
                <ListItemText primary={product.name} />
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

