// pages/Home.js
import React, { use, useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import ProductCard from "../components/ProductCard";

// import { products } from "../data/products";
import { getProducts, signIn } from "../services/data.service";
import { Add } from "@mui/icons-material";
import AddProduct from "../components/AddProduct";

const Home = () => {

    const [savedProducts, setStoredProducts] = useState([])

    useEffect(() => {
        signIn().then((data) => {

        })
        getProducts().then((data) => {
            setStoredProducts(data)

        })
    }, [])
    return (
        <Container sx={{ mt: 15 }}>

            <Grid container spacing={3}>
                {savedProducts.map((product) => (
                    <Grid item key={product.id} xs={6} sm={6} md={3} lg={2}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>


        </Container>
    );
};

export default Home;