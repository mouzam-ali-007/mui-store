import React, { useEffect } from "react";
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

import { addProduct } from '../services/data.service';

const ProductCard = ({ product }) => {


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
                    alt={product.name}

                    sx={{
                        width: "100%", // 👈 full width
                        height: { xs: 160, sm: 300, md: 200 },
                        objectFit: "cover"
                    }}
                />

                <CardContent>
                    <Typography variant="h6"
                        component="div"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                        }}
                    >{product.name}</Typography>
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