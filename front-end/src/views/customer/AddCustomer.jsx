import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:8000/api/customers', {
            name,
            email,
            phone,
            address
        });
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        navigate('/');
    };

    return (
        <Paper style={{ padding: '16px', width: '750px' }}>
            <Typography  variant="h4" gutterBottom>Add New Customer</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Add Customer</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddCustomer;
