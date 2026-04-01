// pages/Home.js
import React from "react";
import { Grid, Container } from "@mui/material";
import ProductCard from "../components/ProductCard";

import { products } from "../data/products";

const Home = () => {
    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={6} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;