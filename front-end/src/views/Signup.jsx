import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client.js';
import { useStateContext } from '../contexts/ContextProvider';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        console.log(data);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a new Account
        </Typography>
        {errors && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {Object.keys(errors).map(key => (
              <Typography key={key}>{errors[key][0]}</Typography>
            ))}
          </Alert>
        )}
        <form onSubmit={onSubmit}>
          <TextField
            inputRef={nameRef}
            label="Full Name"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            inputRef={emailRef}
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            inputRef={passwordConfirmationRef}
            label="Confirm Your Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Sign up
          </Button>
          <Typography variant="body2" align="center">
            Already Registered? <Link to={'/login'}>Sign in</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
