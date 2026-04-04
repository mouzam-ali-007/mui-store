import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { addProduct } from "../services/data.service";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: null, // store file
    });
    const [preview, setPreview] = useState(null); // image preview

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!validTypes.includes(file.type)) {
            alert("Only JPG, JPEG, and PNG files are allowed!");
            return;
        }

        setProduct((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
    };

    const postProductData = async () => {
        try {
            // Optional: upload image first if needed
            // const imageUrl = await uploadImageFromFile(product.image);

            const data = await addProduct({
                ...product,
                image: product.image ? product.image.name : null, // replace with uploaded URL
            });
            console.log("Product added:", data);
            setProduct({ name: "", price: "", description: "", image: null });
            setPreview(null);
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postProductData();
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Add Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Product Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />

                    {/* File Upload */}
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Upload Image
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>

                    {/* Image Preview */}
                    {preview && (
                        <Box mt={2} textAlign="center">
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ maxWidth: "100%", maxHeight: 200 }}
                            />
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={!product.name || !product.price}
                    >
                        Add Product
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddProduct;