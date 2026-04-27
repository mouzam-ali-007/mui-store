import React, { useEffect, useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

    // inside component
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const navigate = useNavigate();

    return (
        <Card
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 1,
                position: "relative",
            }}
        >
            {/* IMAGE SECTION */}
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    onClick={() => navigate(`/product/${product.id}`)}
                    sx={{
                        width: "100%",
                        height: 300,
                        objectFit: "cover",
                    }}
                />

                {/* Discount Badge */}
                {product.discount && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            bgcolor: "red",
                            color: "#fff",
                            px: 1.2,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                    >
                        -{product.discount}%
                    </Box>
                )}

                {/* Wishlist Icon */}
                <IconButton

                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        bgcolor: "#fff",
                    }}
                >
                    <FavoriteBorderIcon />
                </IconButton>

            </Box>

            {/* CONTENT */}
            <CardContent sx={{ p: 1.5 }}>
                {/* Price */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ color: "red", fontWeight: 700 }}>
                        PKR {product.price}
                    </Typography>

                    {product.oldPrice && (
                        <Typography
                            sx={{
                                textDecoration: "line-through",
                                color: "gray",
                                fontSize: 14,
                            }}
                        >
                            ${product.oldPrice}
                        </Typography>
                    )}
                </Box>

                {/* Title */}
                <Typography
                    sx={{
                        fontSize: 14,
                        mt: 0.5,
                        color: "#555",
                    }}
                >
                    {product.brand} • {product.name}
                </Typography>

                {/* Tags */}
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    {product.express && (
                        <Chip
                            label="Express"
                            size="small"
                            sx={{ bgcolor: "#1976d2", color: "#fff", fontSize: 12 }}
                        />
                    )}

                    {product.rating && (
                        <Chip
                            label={`⭐ ${product.rating}`}
                            size="small"
                            sx={{ fontSize: 12 }}
                        />
                    )}
                </Box>
            </CardContent>

            {/* Add to Cart Button */}
            <IconButton
                onClick={handleOpen}
                sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    bgcolor: "#fff",
                    boxShadow: 1,
                }}
            >
                <ShoppingBagOutlinedIcon />
            </IconButton>

            <ProductModal open={open} handleClose={handleClose} product={product}

            />

        </Card>
    );
};

export default ProductCard;