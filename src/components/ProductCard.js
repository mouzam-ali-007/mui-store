import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    console.log("🚀 ~ ProductCard ~ product:", product)
    return (
        <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 3 }}>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.title}
                />

                <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography color="text.secondary">
                        PKR {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button size="small" variant="contained">
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;