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
            const updatedProducts = data.map((item) => {
                const discount = 20; // static for now OR calculate later



                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    image: item.image,

                    // required UI fields
                    brand: "De Mellier", // static or from API later
                    price: item.price,
                    oldPrice: (item.price * 1.2).toFixed(2), // fake old price
                    discount: discount,
                    rating: 5.0, // static for now
                    express: true, // static flag
                    details: [
                        { label: "Bag Style", value: "This exquisite Festive/Party Wear Bag set boasts a bright lavender color scheme, perfect for summer wear. The cotton shirt features intricate embroidery, while the farshi shalwar bottoms and Bemberg crinkle chiffon dupatta add a touch of elegance. Ideal for special occasions, this 3-piece set from Haraj Collections exudes charm and sophistication." },
                    ],
                    images: [item.image, item.image, item.image], // 👈 important
                    sizes: ["S", "M", "L", "XL"]
                };
            });

            setStoredProducts(updatedProducts);

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