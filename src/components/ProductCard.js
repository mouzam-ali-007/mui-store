// components/ProductCard.js
import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";

const ProductCard = ({ product }) => {
    return (
        <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
            />

            <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography color="text.secondary">
                    PKR     {product.price}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" variant="contained">
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;