import React from "react";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
    { title: "Women", image: "/womens.avif", path: "/women" },
    { title: "Men", image: "/mens.avif", path: "/comingsoon" },
    { title: "Kids", image: "/kids.jpg", path: "/comingsoon" },

];

const ShopStores = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ padding: "40px 20px", textAlign: "center" }}>

            {/* Title */}
            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                Shop Our Stores
            </Typography>

            {/* Grid */}
            <Grid container spacing={3} justifyContent="center">
                {categories.map((item, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index}>

                        {/* Card */}
                        <Card
                            onClick={() => navigate(item.path)}
                            sx={{
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "none",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.title}
                                sx={{
                                    height: 170,
                                    objectFit: "cover",
                                }}
                            />
                        </Card>

                        {/* Label */}
                        <Typography
                            mt={1.5}
                            fontWeight={600}
                            fontSize="16px"
                        >
                            {item.title}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ShopStores;
