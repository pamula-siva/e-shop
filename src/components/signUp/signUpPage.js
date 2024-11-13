import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signUp.css';
import '../../common/common.css';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/signup', {
        firstName, lastName, email, password, contactNumber
      });
      // Handle success, redirect, etc.
      console.log(response.data);
    } catch (error) {
      setError('Sign up failed');
    }
  };

  return (
    <Container className='signup-container' maxWidth="xs">
       <div className='signup-title'>
      <LockOutlinedIcon className='lock-icon'/>
      <Typography variant="h5" gutterBottom>Sign Up </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="First Name" 
          variant="outlined" 
          fullWidth 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} 
          margin="normal"
          required
        />
        <TextField 
          label="Last Name" 
          variant="outlined" 
          fullWidth 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} 
          margin="normal"
        />
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          margin="normal"
          required
        />
        <TextField 
          label="Password" 
          variant="outlined" 
          type="password" 
          fullWidth 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          margin="normal"
        />
        <TextField 
          label="Confirm Password" 
          variant="outlined" 
          type="password" 
          fullWidth 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} 
          margin="normal"
          required
        />
        <TextField 
          label="Contact Number" 
          variant="outlined" 
          fullWidth 
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)} 
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
        <Link to="/login">Already have an account? sing in</Link>
      </form>
    </Container>
  );
};

export default SignUpPage;
