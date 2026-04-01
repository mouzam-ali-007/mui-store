import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";

const ShoppingBag = ({bagOpen, setBagOpen}) => {

   

 return (
<Drawer
  anchor="right"
  open={bagOpen}
  onClose={() => setBagOpen(false)}
  PaperProps={{
    sx: { width: 350, p: 2 } // adjust width as needed
  }}
>
  <Typography variant="h6" mb={2}>
    Your Bag
  </Typography>

  {/* Example Cart Items */}
  <Box>
    <Typography>HeadPhone x 1</Typography>
    <Typography>Speakers x 2</Typography>
  </Box>

  <Box mt={2}>
    <Typography fontWeight="bold">Total: PKR 5,000</Typography>
  </Box>

  <Box mt={2}>
    <Button
      variant="contained"
      fullWidth
      color="primary"
      onClick={() => alert("Go to Checkout")}
    >
      Checkout
    </Button>
  </Box>
</Drawer>
 )
}

export default ShoppingBag;