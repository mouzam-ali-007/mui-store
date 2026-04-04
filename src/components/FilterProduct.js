import React, { useState } from "react";
import {
    Stack,
    Button,
    Menu,
    MenuItem,
    Chip,
    Switch,
    FormControlLabel
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterProduct = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const [filterAnchorEl, setFilterAnchorEl] = useState(null);

    const [anchor, setAnchor] = useState(null);
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");


    const [filters, setFilters] = useState({
        inStock: false,
        fabric: "",
        price: "",
        size: "",
        color: "",
        brand: ""
    });

    const handleSelectCategory = (value) => {
        setCategory(value);
        handleClose();
        onFilter({ category: value, inStock });
    };


    const handleFiltersCategory = (value) => {
        setCategory(value);
        handleClose();
        onFilter({ category: value, inStock });
    };



    const handleOpen = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleFilterOpen = (event) => setFilterAnchorEl(event.currentTarget);

    const handleFilterClose = () => setFilterAnchorEl(null);
    const handleSelect = (value) => {
        setFilters((prev) => ({
            ...prev,
            [activeMenu]: value
        }));
        closeMenu();
        // Notify parent with the updated filter value
        onFilter({ category, inStock, ...filters, [activeMenu]: value });
    };

    const openMenu = (event, type) => {
        setAnchor(event.currentTarget);
        setActiveMenu(type);
    };

    const closeMenu = () => {
        setAnchor(null);
        setActiveMenu("");
    };



    const onFilter = (filters) => {
        console.log("Applied Filters:", filters);
    }
    const FilterButton = ({ label, type }) => (
        <Button
            variant="outlined"
            onClick={(e) => openMenu(e, type)}
            endIcon={<ExpandMoreIcon />}
            sx={{
                borderRadius: "20px",
                textTransform: "none",
                px: 2,
                py: 1,
                borderColor: "#ccc",
                color: "#333",
                backgroundColor: "#fff"
            }}
        >
            {filters[type] || label}
        </Button>
    );

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            flexWrap="wrap"
            mb={3}
        >

            {/* Category Dropdown */}
            <Button
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                onClick={handleOpen}
            >
                {category || "Category"}
            </Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => handleSelectCategory("")}>All</MenuItem>
                <MenuItem onClick={() => handleSelectCategory("Electronics")}>Electronics</MenuItem>
                <MenuItem onClick={() => handleSelectCategory("Clothes")}>Clothes</MenuItem>
                <MenuItem onClick={() => handleSelectCategory("Books")}>Books</MenuItem>
            </Menu>

            {/* Filter Button */}
            <Button
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={handleFilterOpen}
            >
                Filters
            </Button>
            <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
                <MenuItem onClick={() => handleFiltersCategory("")}>All</MenuItem>
                <MenuItem onClick={() => handleFiltersCategory("InStock")}>InStock</MenuItem>
                <MenuItem onClick={() => handleFiltersCategory("Fabric")}>Fabric</MenuItem>
                <MenuItem onClick={() => handleFiltersCategory("Price")}>Price</MenuItem>
            </Menu>



            {/* In Stock Toggle */}
            <FormControlLabel
                control={
                    <Switch
                        checked={inStock}
                        onChange={(e) => {
                            setInStock(e.target.checked);
                            onFilter({ category, inStock: e.target.checked });
                        }}
                    />
                }
                label="In-stock"
            />
            {/* Filter buttons */}

            <FilterButton label="Price" type="price" />
            <FilterButton label="Size" type="size" />
            <FilterButton label="Color" type="color" />
            <FilterButton label="Brands" type="brand" />

            <Button
                variant="outlined"
                onClick={handleFilterOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                    py: 1,
                    borderColor: "#ccc",
                    color: "#333",
                    backgroundColor: "#fff"
                }}
            >
                Fabric
            </Button>

            <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
                <MenuItem onClick={() => handleSelect("")}>All</MenuItem>
                <MenuItem onClick={() => handleSelect("Electronics")}>Electronics</MenuItem>
                <MenuItem onClick={() => handleSelect("Clothes")}>Clothes</MenuItem>
                <MenuItem onClick={() => handleSelect("Books")}>Books</MenuItem>
            </Menu>



            {/* Dropdown menu */}
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >


                {/* {activeMenu === "fabric" && (
                    <>
                      
                    </>
                )} */}

                {activeMenu === "price" && (
                    <>
                        <MenuItem onClick={() => handleSelect("0-50")}>$0 - $50</MenuItem>
                        <MenuItem onClick={() => handleSelect("50-100")}>$50 - $100</MenuItem>
                    </>
                )}

                {activeMenu === "size" && (
                    <>
                        <MenuItem onClick={() => handleSelect("S")}>S</MenuItem>
                        <MenuItem onClick={() => handleSelect("M")}>M</MenuItem>
                        <MenuItem onClick={() => handleSelect("L")}>L</MenuItem>
                    </>
                )}

                {activeMenu === "color" && (
                    <>
                        <MenuItem onClick={() => handleSelect("Red")}>Red</MenuItem>
                        <MenuItem onClick={() => handleSelect("Blue")}>Blue</MenuItem>
                    </>
                )}

                {activeMenu === "brand" && (
                    <>
                        <MenuItem onClick={() => handleSelect("Nike")}>Nike</MenuItem>
                        <MenuItem onClick={() => handleSelect("Adidas")}>Adidas</MenuItem>
                    </>
                )}
            </Menu>


            {/* Active Filter Chips */}
            {category && (
                <Chip
                    label={`Category: ${category}`}
                    onDelete={() => {
                        setCategory("");
                        onFilter({ category: "", inStock, ...filters });
                    }}
                />
            )}
            {Object.entries(filters).map(([key, value]) => {
                if (key !== "inStock" && value) {
                    return (
                        <Chip
                            key={key}
                            label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                            onDelete={() => {
                                const newFilters = { ...filters, [key]: "" };
                                setFilters(newFilters);
                                onFilter({ category, inStock, ...newFilters });
                            }}
                        />
                    );
                }
                return null;
            })}
        </Stack>
    );
};

export default FilterProduct;