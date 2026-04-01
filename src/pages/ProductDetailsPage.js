import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductDetails from "../components/ProductDetails";
import { products } from "../data/products";

const ProductDetailsPage = () => {
  const { id } = useParams();
  
  // Find product by id from URL params
  const product = products.find((p) => p.id === parseInt(id));

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      {/* Back button */}
      <Box sx={{ mb: 3 }}>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<ArrowBackIcon />}
          color="inherit"
        >
          Back to Home
        </Button>
      </Box>
      
      {/* Product Details Component */}
      <ProductDetails product={product} />
    </Container>
  );
};

export default ProductDetailsPage;
