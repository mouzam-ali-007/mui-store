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
        <Card sx={{
            width: "100%", // full width on mobile
            maxWidth: { xs: "100%", sm: 200, md: 350 }, // responsive sizes
            borderRadius: 3,
            boxShadow: 2,
            mx: "auto" // center on larger screens
        }}>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardMedia
                    component="img"
                    width={"100"}
                    height="200"
                    image={product.image}
                    alt={product.title}

                    sx={{
                        width: "100%", // 👈 full width
                        height: { xs: 160, sm: 300, md: 200 },
                        objectFit: "cover"
                    }}
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