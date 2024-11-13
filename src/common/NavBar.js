// src/components/NavBar.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, TextField, Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Check user authentication status and role from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data
    if (user) {
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin'); // Assuming 'role' exists on the user object
    }
  }, []);

  // Log out function: Clear session data and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session from localStorage
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login'); // Redirect to login page
  };

  // Search functionality (you could hook this to an API later)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`); // Redirect to search results page
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.dark' }}>
      <Toolbar>
        {/* Logo (ShoppingCart Icon) */}
        <IconButton color="inherit" component={Link} to="/">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          upGrad Eshop
        </Typography>

        {/* Search Bar (only visible if user is authenticated) */}
        {isAuthenticated && (
          <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search Products"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button type="submit" variant="contained" color="secondary">
              Search
            </Button>
          </Box>
        )}

        {/* Links for authenticated users */}
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            {isAdmin && (
              <Button color="inherit" component={Link} to="/add-product">
                Add Product
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Sign In
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

// import React from 'react';
// import { AppBar, Toolbar, IconButton, TextField, Button } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { Link as RouterLink } from 'react-router-dom';

// const NavBar = ({ onSearch }) => {
//   return (
//     <AppBar position="static" sx={{ backgroundColor: 'primary.dark' }}>
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="logo">
//           <img src="/path-to-logo.png" alt="Logo" style={{ height: '40px' }} />
//         </IconButton>
//         <TextField
//           label="Search"
//           variant="outlined"
//           onChange={onSearch}
//           size="small"
//           style={{ marginLeft: 'auto', marginRight: '20px' }}
//           InputProps={{
//             startAdornment: <SearchIcon />,
//           }}
//         />
//         <Button color="inherit" component={RouterLink} to="/login">Login</Button>
//         <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;

