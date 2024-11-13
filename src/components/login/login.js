
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './login.css'
import '../../common/common.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');

  const handleSubmit =  (e) => {
        e.preventDefault();
    
        // Prepare login data
        const loginData = {
          "username": email,
          "password": password
        };
    
        // Send POST request to login endpoint
        axios.post('https://dev-project-ecommerce.upgrad.dev/api/auth/login', loginData)
          .then(response => {
            sessionStorage.setItem("token", response.data);
            sessionStorage.setItem("user", true);
            // Store token or redirect to dashboard
          })
          .catch(error => {
            console.error('Login failed:', error);
            // Handle login failure (e.g., display error message)
          });
      };

  return (
    <Container className="login-container" maxWidth="xs">
      <div className='login-title'>
      <LockOutlinedIcon className='lock-icon'/>
      <Typography variant="h5" gutterBottom>Sign In </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Email Address *" 
          variant="outlined" 
          fullWidth 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          margin="normal"
        />
        <TextField 
          label="Password *" 
          variant="outlined" 
          type="password" 
          fullWidth 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
        <Link to="/signup">Don't have an account?Sign Up</Link>
      </form>
    </Container>
  );
};

export default Login;

