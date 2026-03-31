// pages/Home.js
import React from "react";
import { Grid, Container } from "@mui/material";
import ProductCard from "../components/ProductCard";

const products = [
    {
        id: 1,
        title: "Headphone",
        price: 50,
        image: "/headphone1.jpeg",
    },
    {
        id: 2,
        title: "Headphone",
        price: 120,
        price: 50,
        image: "/headphone2.jpeg",
    },
    {
        id: 3,
        title: "Mouse",
        price: 80,
        price: 50,
        image: "/mouse.jpeg",
    },
    {
        id: 4,
        title: "Mouse",
        price: 80,
        price: 50,
        image: "/mouse.jpeg",
    },
    {
        id: 5,
        title: "headphone",
        price: 80,
        price: 50,
        image: "/headphone2.jpeg",
    },
    {
        id: 6,
        title: "Mouse",
        price: 80,
        price: 50,
        image: "/mouse.jpeg",
    },
    {
        id: 7,
        title: "speakers",
        price: 80,
        price: 50,
        image: "/speakers.jpg",
    },
    {
        id: 8,
        title: "Mouse",
        price: 80,
        price: 50,
        image: "/mouse.jpeg",
    },
    {
        id: 9,
        title: "Speakers",
        price: 80,
        price: 50,
        image: "/speakers.jpg",
    },
];

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