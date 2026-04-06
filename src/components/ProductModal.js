import React from "react";
import {
    Dialog,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductModal = ({ open, handleClose, product }) => {
    if (!product) return null;

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <Box sx={{ display: "flex", height: "80vh" }}>

                {/* LEFT IMAGE */}
                <Box sx={{ flex: 1 }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                {/* RIGHT CONTENT */}
                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                        overflowY: "auto",
                        position: "relative",
                    }}
                >
                    {/* Close */}
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 10, top: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Brand */}
                    <Typography variant="h6" fontWeight={600}>
                        {product.brand}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {product.name}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" fontWeight={700}>
                            ${product.price}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Typography sx={{ textDecoration: "line-through", color: "gray" }}>
                                ${product.oldPrice}
                            </Typography>
                            <Typography color="error">-{product.discount}%</Typography>
                        </Box>
                    </Box>

                    {/* Express */}
                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{ color: "#1976d2", fontWeight: 600 }}>
                            ⚡ Express — Instant dispatch
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* DETAILS */}
                    <Typography variant="h6">Product Details</Typography>

                    <Box sx={{ mt: 1 }}>
                        {product.details?.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    py: 0.5,
                                }}
                            >
                                <Typography color="text.secondary">{item.label}</Typography>
                                <Typography>{item.value}</Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Description */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">{product.description}</Typography>
                    </Box>

                    {/* Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            bgcolor: "black",
                            "&:hover": { bgcolor: "#333" },
                        }}
                    >
                        Add To Bag
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default ProductModal;