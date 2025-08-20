// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-lg">
//       <h1 className="text-xl font-bold">My App</h1>
//       <div className="space-x-4">
//         <Link to="/products" className="hover:text-gray-300">Products</Link>
//         <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0D47A1' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          My App
        </Typography>
        <Box>
          <Button 
            component={Link} 
            to="/products" 
            sx={{ color: 'white', textTransform: 'none', mr: 2 }}
          >
            Products
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

