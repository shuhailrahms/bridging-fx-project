import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box
} from "@mui/material";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [editCustomer, setEditCustomer] = useState(null);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const response = await axios.get("http://localhost:8000/api/customers");
        setCustomers(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/customers/${id}`);
        fetchCustomers();
    };

    const handleEditOpen = (customer) => {
        setEditCustomer(customer);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditCustomer(null);
        setEditDialogOpen(false);
    };

    const handleEditSave = async () => {
        await axios.put(
            `http://localhost:8000/api/customers/${editCustomer.id}`,
            editCustomer
        );
        setEditDialogOpen(false);
        fetchCustomers();
    };

    const handleAddOpen = () => {
        setAddDialogOpen(true);
    };

    const handleAddClose = () => {
        setNewCustomer({
            name: '',
            email: '',
            phone: '',
            address: ''
        });
        setAddDialogOpen(false);
    };

    const handleAddSave = async () => {
        await axios.post('http://localhost:8000/api/customers', newCustomer);
        setAddDialogOpen(false);
        setNewCustomer({
            name: '',
            email: '',
            phone: '',
            address: ''
        });
        fetchCustomers();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Box sx={{ padding: 3, marginRight: '150px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Customer Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={handleAddOpen}
                    >
                        Add New Customer
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#0D47A1 !important" }}>
                            <TableRow>
                                <TableCell sx={{ color: "black" }}>Name</TableCell>
                                <TableCell sx={{ color: "black" }}>Email</TableCell>
                                <TableCell sx={{ color: "black" }}>Phone</TableCell>
                                <TableCell sx={{ color: "black" }}>Address</TableCell>
                                <TableCell sx={{ color: "black" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length > 0 ? (
                                customers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.phone}</TableCell>
                                            <TableCell>{customer.address}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{ marginRight: 1 }}
                                                    onClick={() => handleEditOpen(customer)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDelete(customer.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No customers available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <TablePagination
                        component="div"
                        count={customers.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>

                {/* Edit Customer Dialog */}
                <Dialog open={editDialogOpen} onClose={handleEditClose}>
                    <DialogTitle>Edit Customer</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Name"
                            fullWidth
                            value={editCustomer?.name || ""}
                            onChange={(e) =>
                                setEditCustomer({
                                    ...editCustomer,
                                    name: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            fullWidth
                            value={editCustomer?.email || ""}
                            onChange={(e) =>
                                setEditCustomer({
                                    ...editCustomer,
                                    email: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Phone"
                            fullWidth
                            value={editCustomer?.phone || ""}
                            onChange={(e) =>
                                setEditCustomer({
                                    ...editCustomer,
                                    phone: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Address"
                            fullWidth
                            value={editCustomer?.address || ""}
                            onChange={(e) =>
                                setEditCustomer({
                                    ...editCustomer,
                                    address: e.target.value,
                                })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleEditSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Add Customer Dialog */}
                <Dialog open={addDialogOpen} onClose={handleAddClose}>
                    <DialogTitle>Add Customer</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Name"
                            fullWidth
                            value={newCustomer.name}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    name: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            fullWidth
                            value={newCustomer.email}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    email: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Phone"
                            fullWidth
                            value={newCustomer.phone}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    phone: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Address"
                            fullWidth
                            value={newCustomer.address}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    address: e.target.value,
                                })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default CustomerList;
