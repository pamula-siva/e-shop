import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Box, ToggleButton, ToggleButtonGroup, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const ProductsPage = ({ isAuthenticated, isAdmin, user }) => {
  // State variables
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOption, setSortingOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch products and categories
  useEffect(() => {
    // if (isAuthenticated) {
      // Fetch categories
      axios.get('https://dev-project-ecommerce.upgrad.dev/api//products/categories')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });

      // Fetch products
      axios.get('https://dev-project-ecommerce.upgrad.dev/api//products')
        .then(response => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    // } else {
    //   // Redirect to login page if not authenticated
    //   window.location.href = '/login';
    // }
  }, [isAuthenticated]);

  // Handle sorting change
  const handleSortChange = (event) => {
    setSortingOption(event.target.value);
    sortProducts(event.target.value);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...products];
    switch (option) {
      case 'price_high_to_low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'price_low_to_high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  // Handle category change
  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
    filterProductsByCategory(newCategory);
  };

  const filterProductsByCategory = (category) => {
    axios.get(`https://dev-project-ecommerce.upgrad.dev/api//products?category=${category}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error filtering by category:', error);
      });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Category Filter */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="category filter"
        >
          {categories.map((category) => (
            <ToggleButton key={category} value={category} aria-label={category}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Sorting Options */}
      <FormControl sx={{ minWidth: 120, marginBottom: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortingOption}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="price_high_to_low">Price: High to Low</MenuItem>
          <MenuItem value="price_low_to_high">Price: Low to High</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {loading ? (
          <Typography variant="h6" sx={{ width: '100%' }}>Loading...</Typography>
        ) : (
          filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">${product.price}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  {isAdmin && (
                    <Box>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ProductsPage;


// import React from 'react';
// import { ButtonGroup, Button } from '@mui/material';

// const ProductCategories = ({ categories, onCategorySelect }) => {
//   return (
//     <ButtonGroup variant="contained" aria-label="product categories">
//       {categories.map((category, index) => (
//         <Button key={index} onClick={() => onCategorySelect(category)}>
//           {category}
//         </Button>
//       ))}
//     </ButtonGroup>
//   );
// };

// export default ProductCategories;