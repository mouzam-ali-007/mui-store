import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from "@mui/icons-material/Close";

const SuccessModal = ({ open, onClose, orderSummary }) => {
    console.log("🚀 ~ SuccessModal ~ open:", open)
    const navigate = useNavigate();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', bgcolor: 'success.light', color: 'success.dark' }}>
                Order Placed Successfully! 🎉
            </DialogTitle>

            {(
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
            <DialogContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                    Thank you for your purchase!
                </Typography>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="body1">Your order has been confirmed.</Typography>
                    <Typography variant="body2" color="text.secondary">We'll send a confirmation email shortly.</Typography>
                </Box>

                {orderSummary && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Order Summary:</Typography>
                        <List dense>
                            {orderSummary.items.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`${item.name} x${item.quantity}`}
                                        secondary={`$${item.price}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold', textAlign: 'right' }}>
                            Total: ${orderSummary.total.toFixed(2)}
                        </Typography>
                    </Box>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Delivery to: {orderSummary?.address || 'Your address'}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" onClick={() => { onClose(); navigate('/'); }}>
                    Continue Shopping
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessModal;

