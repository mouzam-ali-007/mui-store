// components/FilterProduct.js
import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";

const FilterProduct = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        name: "",
        minPrice: "",
        maxPrice: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleApplyFilter = () => {
        // Pass filters back to parent component
        onFilter(filters);
    };

    const handleReset = () => {
        setFilters({ name: "", minPrice: "", maxPrice: "", category: "" });
        onFilter({}); // reset filters in parent
    };

    return (
        <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            mb={3}
            alignItems="center"
        >
            <TextField
                label="Product Name"
                name="name"
                value={filters.name}
                onChange={handleChange}
            />
            <TextField
                label="Min Price"
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handleChange}
            />
            <TextField
                label="Max Price"
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleChange}
            />
            <TextField
                select
                label="Category"
                name="category"
                value={filters.category}
                onChange={handleChange}
                sx={{ minWidth: 150 }}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Clothes">Clothes</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" onClick={handleApplyFilter}>
                Apply
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
                Reset
            </Button>
        </Box>
    );
};

export default FilterProduct;