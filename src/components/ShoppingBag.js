import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeItem, updateQuantity } from '../store/cartSlice';
import CheckoutModal from "./CheckoutModal";


const ShoppingBag = ({ bagOpen, setBagOpen, }) => {


  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setBagOpen(false);
    setCheckoutOpen(true);
  };


  const handleCheckoutSuccess = () => {
    setCheckoutOpen(false);
    setBagOpen(false);
  };

  console.log("🚀 ~ ShoppingBag ~ checkoutOpen:", checkoutOpen)


  if (items.length === 0) {
    return (
      <Drawer
        anchor="right"
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        PaperProps={{ sx: { width: 350, p: 2 } }}
      >
        <Typography variant="h6" mb={2}>Your Bag</Typography>
        <Typography color="text.secondary">Your cart is empty</Typography>
        <Box sx={{ mt: 4 }}>
          <Button fullWidth variant="outlined" onClick={() => setBagOpen(false)}>
            Continue Shopping
          </Button>
        </Box>
      </Drawer>
    );
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        PaperProps={{ sx: { width: 350, p: 2 } }}
      >
        <Typography variant="h6" mb={2}>Your Bag ({items.length} items)</Typography>

        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {items.map((item) => (
            <ListItem key={`${item.id}-${item.size || 'no-size'}`} divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography variant="body2" fontWeight="medium">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.price} x {item.quantity}
                </Typography>
                {item.size && <Typography variant="caption">Size: {item.size}</Typography>}
              </Box>
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1, size: item.size }))}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1, size: item.size }))}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    edge="end"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    ×
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>Total:</Typography>
          <Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleCheckout}
          sx={{ mb: 2 }}
        >
          Go to Checkout
        </Button>
      </Drawer>
      {/* ✅ Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};

export default ShoppingBag;
