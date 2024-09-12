import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client.js';
import { useStateContext } from '../contexts/ContextProvider';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        console.log(data);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]
            });
          }
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login into your account
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
            inputRef={emailRef}
            label="Email"
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" align="center">
            Not Registered? <Link to={'/signup'}>Create an account</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
