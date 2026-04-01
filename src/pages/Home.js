// pages/Home.js
import React from "react";
import { Grid, Container } from "@mui/material";
import ProductCard from "../components/ProductCard";

import { products } from "../data/products";

const Home = () => {
    return (
        <Container sx={{ mt: 15 }}>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={12} md={2}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;