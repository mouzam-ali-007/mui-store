import React from "react";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProductDetails = ({ product }) => {
  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, mt: 4, borderRadius: 3 }}>
      <Grid container spacing={4}>
        {/* Product Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#f9f9f9",
              borderRadius: 3,
              p: 2,
              height: "100%",
              minHeight: 300,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: "100%",
                maxHeight: 400,
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>

        {/* Product Info Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            PKR {product.price}
          </Typography>

          {/* Description */}
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 2 }}>
            {product.description || "No description available for this product."}
          </Typography>

          {/* Features / Highlights */}
          <Box sx={{ mt: 3, mb: 4 }}>
             <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                 <CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 20 }} /> In Stock and ready to ship
             </Typography>
             <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                 <LocalShippingIcon color="action" sx={{ mr: 1, fontSize: 20 }} /> Free shipping over PKR 500
             </Typography>
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              sx={{ px: 4, py: 1.5, fontWeight: "bold" }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              sx={{ px: 4, py: 1.5, fontWeight: "bold" }}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductDetails;
