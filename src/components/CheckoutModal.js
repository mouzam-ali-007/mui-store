import React, { useState, useEffect, useMemo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Alert,
    useTheme,
} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearCart } from '../store/cartSlice';
import { placeOrder } from '../services/data.service';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

const CheckoutModal = ({ open, onClose, onSuccess }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { items, total } = useAppSelector((state) => {
        const total = state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items: state.cart.items, total };
    });

    const user = useMemo(() => {
        return JSON.parse(sessionStorage.getItem('user') || 'null');
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);


    const [orderSummary, setOrderSummary] = useState(null);

    const handleSuccessClose = () => {
        setSuccessOpen(false);
        setOrderSummary(null);
    };


    useEffect(() => {
        if (user) {
            setFormData({
                name: user.user_metadata?.full_name || '',
                phone: user.phone || '',
                email: user.email || '',
                address: '',
            });
        }
    }, [user]);

    if (!user) {
        navigate('/auth');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const orderData = {
                user_id: user.id,
                items,
                total,
                ...formData,
            };
            const res = await placeOrder(orderData);
            //dispatch(clearCart());
            setOrderSummary(orderData);
            setSuccessOpen(true)
            onClose()
            // onSuccess();

        } catch (err) {

            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Dialog open={open} onClose={!loading ? onClose : undefined} maxWidth="sm" fullWidth>

                <DialogTitle sx={{ pr: 6 }}>
                    Checkout
                </DialogTitle>

                {!loading && (
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                <DialogContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
                    <Box sx={{ mb: 3 }}>
                        {items.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>{item.name} x{item.quantity}</Typography>
                                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                            </Box>
                        ))}
                        <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                            Total: ${calculateTotal().toFixed(2)}
                        </Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Address / Street"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                            multiline
                            rows={3}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : null}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <SuccessModal open={successOpen} onClose={handleSuccessClose} orderSummary={orderSummary} />

        </>
    );
};

export default CheckoutModal;

