import React from "react";
import {
    Box,
    Button,
    FormControlLabel,
    Menu,
    MenuItem,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";

const FilterProduct = ({
    category,
    categories,
    inStock,
    sortBy,
    onCategoryChange,
    onInStockChange,
    onSortChange,
    onClearFilters
}) => {
    const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);
    const [sortAnchorEl, setSortAnchorEl] = React.useState(null);

    const hasActiveFilters = Boolean(category || inStock || sortBy);


    let filterCategories = ['women']

    return (
        <Box sx={{ mb: 3 }}>
            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    pb: 1,
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none"
                }}
            >
                <Button
                    variant="outlined"
                    endIcon={<ExpandMoreIcon />}
                    onClick={(event) => setCategoryAnchorEl(event.currentTarget)}
                    sx={{ flex: "0 0 auto" }}
                >
                    {category || "Category"}
                </Button>

                <Menu
                    anchorEl={categoryAnchorEl}
                    open={Boolean(categoryAnchorEl)}
                    onClose={() => setCategoryAnchorEl(null)}
                >
                    <MenuItem
                        onClick={() => {
                            onCategoryChange("");
                            setCategoryAnchorEl(null);
                        }}
                    >
                        All Categories
                    </MenuItem>
                    {filterCategories.map((item) => (
                        <MenuItem
                            key={item}
                            onClick={() => {
                                onCategoryChange(item);
                                setCategoryAnchorEl(null);
                            }}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Menu>

                <Button
                    variant="outlined"
                    startIcon={<TuneIcon />}
                    endIcon={<ExpandMoreIcon />}
                    onClick={(event) => setSortAnchorEl(event.currentTarget)}
                    sx={{ flex: "0 0 auto" }}
                >
                    {sortBy === "price-asc"
                        ? "Price: Low to High"
                        : sortBy === "price-desc"
                            ? "Price: High to Low"
                            : "Sort"}
                </Button>

                <Menu
                    anchorEl={sortAnchorEl}
                    open={Boolean(sortAnchorEl)}
                    onClose={() => setSortAnchorEl(null)}
                >
                    <MenuItem
                        onClick={() => {
                            onSortChange("");
                            setSortAnchorEl(null);
                        }}
                    >
                        Default
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onSortChange("price-asc");
                            setSortAnchorEl(null);
                        }}
                    >
                        Price: Low to High
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onSortChange("price-desc");
                            setSortAnchorEl(null);
                        }}
                    >
                        Price: High to Low
                    </MenuItem>
                </Menu>

                <FormControlLabel
                    sx={{ ml: 0.5, flex: "0 0 auto" }}
                    control={
                        <Switch
                            checked={inStock}
                            onChange={(event) => onInStockChange(event.target.checked)}
                        />
                    }
                    label="In Stock"
                />

                {hasActiveFilters && (
                    <Button
                        color="inherit"
                        onClick={onClearFilters}
                        sx={{ flex: "0 0 auto" }}
                    >
                        Clear
                    </Button>
                )}
            </Stack>

            {hasActiveFilters && (
                <Typography sx={{ mt: 1, color: "text.secondary", fontSize: 14 }}>
                    Showing products matching your current filters.
                </Typography>
            )}
        </Box>
    );
};

export default FilterProduct;
