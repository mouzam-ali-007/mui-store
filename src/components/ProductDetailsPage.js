import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductDetails from "./ProductDetails";
import { products } from "../data/products";
import { getProductById } from "../services/data.service";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {

    getProductById(id).then((data) => {
      setProduct(data)

    })
  }, [id])
  // Find product by id from URL params


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
