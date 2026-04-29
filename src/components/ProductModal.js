import React, { useEffect, useState } from "react";
import {
    Dialog,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    Chip,
    Paper,
    Stack,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../store/hooks";
import { addItem } from "../store/cartSlice";
import CheckoutModal from "./CheckoutModal";

const ProductModal = ({ open, handleClose, product }) => {
    const dispatch = useAppDispatch();
    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    const [selectedSize, setSelectedSize] = useState("");
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        setSelectedSize(product?.sizes?.[0] || "");
    }, [product]);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!user) {
            // navigate("/auth");
            // return;
        }
        dispatch(addItem({
            id: product.id,
            name: `${product.brand || ""} ${product.name}`,
            price: product.price,
            image: product.image,
            quantity: 1,
            size: selectedSize || undefined,
        }));
    };

    const handleBuyNow = () => {
        setCheckoutOpen(true);
    };

    const productDetails = product.details?.length
        ? product.details
        : [
            { label: "Material", value: "Premium finish for everyday use" },
            { label: "Category", value: product.category || "Signature collection" },
            { label: "Delivery", value: "Estimated in 3-5 working days" },
        ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            fullScreen={isMobile}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    minHeight: isMobile ? "auto" : 620,
                    bgcolor: "#fcfaf7",
                }}
            >
                {/* IMAGE */}
                <Box
                    sx={{
                        flex: isMobile ? "none" : "0 0 42%",
                        p: { xs: 2, md: 3 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: isMobile ? 320 : 380,
                            aspectRatio: "4 / 5",
                            borderRadius: 4,
                            overflow: "hidden",
                            bgcolor: "#f3eee7",
                            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>
                </Box>

                {/* CONTENT */}
                <Box
                    sx={{
                        flex: 1,
                        p: { xs: 2, md: 4 },
                        overflowY: "auto",
                        position: "relative",
                        bgcolor: "#fff",
                        borderTopLeftRadius: isMobile ? 24 : 0,
                        borderBottomLeftRadius: isMobile ? 0 : 32,
                    }}
                >
                    {/* Close */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                            bgcolor: "#f7f4ef",
                            "&:hover": { bgcolor: "#efe8dd" }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Stack spacing={2.5} sx={{ pr: { md: 4 }, pt: 3 }}>
                        <Box>
                            <Chip
                                label={product.category || "Featured Pick"}
                                size="small"
                                sx={{
                                    mb: 1.5,
                                    bgcolor: "#f3eee7",
                                    color: "#6d5842",
                                    fontWeight: 600,
                                }}
                            />
                            <Typography
                                variant="overline"
                                sx={{ letterSpacing: "0.18em", color: "text.secondary" }}
                            >
                                {product.brand || "LUMA DEVAUX"}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                                    lineHeight: 1.15,
                                    mt: 0.5,
                                }}
                            >
                                {product.name}
                            </Typography>
                        </Box>

                        <Box>
                            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#111" }}>
                                    PKR {product.price}
                                </Typography>
                                {product.oldPrice && (
                                    <Typography sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                                        PKR {product.oldPrice}
                                    </Typography>
                                )}
                                {product.discount && (
                                    <Chip
                                        label={`${product.discount}% OFF`}
                                        size="small"
                                        sx={{ bgcolor: "#fdeceb", color: "#c0362c", fontWeight: 700 }}
                                    />
                                )}
                            </Stack>
                            <Typography sx={{ mt: 1, color: "#1976d2", fontWeight: 600 }}>
                                Express delivery available
                            </Typography>
                        </Box>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: "#f8f5f0",
                                border: "1px solid #eee5d8",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                                Description
                            </Typography>
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                                {product.description || "A refined statement piece designed to elevate your everyday wardrobe with premium styling and comfort."}
                            </Typography>
                        </Paper>

                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Product Details
                            </Typography>
                            <Stack spacing={1.2}>
                                {productDetails.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            gap: 2,
                                            py: 1.2,
                                            borderBottom: "1px solid #f1ece4",
                                        }}
                                    >
                                        <Typography sx={{ color: "text.secondary", minWidth: 110 }}>
                                            {item.label}
                                        </Typography>
                                        <Typography sx={{ textAlign: "right", color: "#1f1f1f", flex: 1 }}>
                                            {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Select Size
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
                                    <Chip
                                        key={size}
                                        label={size}
                                        clickable
                                        onClick={() => setSelectedSize(size)}
                                        variant={selectedSize === size ? "filled" : "outlined"}
                                        sx={{
                                            borderRadius: "10px",
                                            px: 0.5,
                                            fontWeight: 600,
                                            bgcolor: selectedSize === size ? "#171717" : "#fff",
                                            color: selectedSize === size ? "#fff" : "#171717",
                                            borderColor: selectedSize === size ? "#171717" : "#d8d1c7",
                                            "&:hover": {
                                                bgcolor: selectedSize === size ? "#2a2a2a" : "#f7f4ef",
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        sx={{
                            mt: 4,
                            position: isMobile ? "sticky" : "static",
                            bottom: 0,
                            bgcolor: isMobile ? "#fff" : "transparent",
                            pt: isMobile ? 1.5 : 0,
                        }}
                    >
                        <Button
                            onClick={handleAddToCart}
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.6,
                                borderRadius: 999,
                                bgcolor: "#171717",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 700,
                                "&:hover": { bgcolor: "#2a2a2a" },
                            }}
                        >
                            Add To Bag
                        </Button>
                        <Button
                            onClick={handleBuyNow}
                            variant="outlined"
                            fullWidth
                            sx={{
                                py: 1.6,
                                borderRadius: 999,
                                borderColor: "#171717",
                                color: "#171717",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 700,
                                "&:hover": {
                                    borderColor: "#171717",
                                    bgcolor: "#f8f5f0",
                                },
                            }}
                        >
                            Buy Now
                        </Button>
                    </Stack>
                </Box>
            </Box>
            <CheckoutModal
                open={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
                product={[{
                    id: product.id,
                    name: `${product.brand || ""} ${product.name}`,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    size: selectedSize || undefined,
                }]}
            />
        </Dialog>
    );
};

export default ProductModal;
