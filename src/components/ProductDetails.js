import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Grid container spacing={4}>

        {/* LEFT IMAGE SECTION */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", gap: 2 }}>

            {/* Thumbnails */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {(product.images || [product.image]).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: 60,
                    height: 80,
                    objectFit: "cover",
                    cursor: "pointer",
                    border:
                      selectedImage === img
                        ? "2px solid black"
                        : "1px solid #ddd",
                    borderRadius: 6,
                  }}
                />
              ))}
            </Box>

            {/* Main Image */}
            <Box sx={{ flex: 1 }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid item xs={12} md={6}>

          {/* Brand + Name */}
          <Typography variant="h6" fontWeight={600}>
            {product.brand || "Brand"}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {product.name}
          </Typography>

          {/* Price */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              ${product.price}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {product.oldPrice && (
                <Typography sx={{ textDecoration: "line-through", color: "gray" }}>
                  ${product.oldPrice}
                </Typography>
              )}
              {product.discount && (
                <Typography color="error">-{product.discount}%</Typography>
              )}
            </Box>
          </Box>

          {/* Rating */}
          <Typography sx={{ mt: 1 }}>
            ⭐ {product.rating || 4.0} ({product.reviews || 50} reviews)
          </Typography>

          {/* Express Box */}
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography sx={{ color: "#1976d2", fontWeight: 600 }}>
              ⚡ Express — Instant dispatch
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Est. delivery in 3-5 days
            </Typography>
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* SIZE */}
          <Typography fontWeight={600}>Size</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
              <Box
                key={size}
                onClick={() => setSelectedSize(size)}
                sx={{
                  px: 2,
                  py: 1,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  cursor: "pointer",
                  bgcolor: selectedSize === size ? "black" : "#fff",
                  color: selectedSize === size ? "#fff" : "#000",
                }}
              >
                {size}
              </Box>
            ))}
          </Box>

          {/* Quantity */}
          <Box sx={{ mt: 3 }}>
            <Typography fontWeight={600}>Quantity</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <IconButton onClick={() => setQty(Math.max(1, qty - 1))}>
                <RemoveIcon />
              </IconButton>

              <Typography>{qty}</Typography>

              <IconButton onClick={() => setQty(qty + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "black",
                "&:hover": { bgcolor: "#333" },
                py: 1.5,
              }}
            >
              Add To Bag
            </Button>

            <Button variant="outlined" sx={{ py: 1.5 }}>
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;