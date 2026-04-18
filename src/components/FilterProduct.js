import React, { useState } from "react";
import {
    Stack,
    Button,
    Menu,
    MenuItem,
    Chip,
    Switch,
    FormControlLabel,
    Box
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterProduct = () => {
    const [anchorEl, setAnchorEl] = useState(null);


    const [filterAnchorEl, setfilterAnchorEl] = useState(null);

    const [anchor, setAnchor] = useState(null);
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");

    const [activeFilter, setActiveFilter] = useState(null);
    const [activeAnchorEl, setActiveAnchorEl] = useState(null);

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

    const allFiltersDropDownOpen = (event, filterName) => {
        setfilterAnchorEl(event.currentTarget);
    }

    const allFiltersDropDownClose = (event, filterName) => {
        setfilterAnchorEl(null);
    }


    const handleFilterOpen = (event, filterName) => {
        setActiveFilter(null);
        setActiveAnchorEl(event.currentTarget);
        setActiveFilter(filterName);
    };

    const handleFilterClose = () => {
        setActiveAnchorEl(null);
        setActiveFilter(null);
    };



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

    return (
        <Box
            sx={{
                width: "100%",

            }}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"

                mt={3}
                mb={3}
                sx={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    pb: 1,

                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none"
                }}

            >

                {/* Category Dropdown */}
                <Button
                    variant="outlined"
                    endIcon={<ExpandMoreIcon />}
                    onClick={handleOpen}
                    sx={{
                        flex: "0 0 auto", // 👈 KEY FIX
                    }}
                >
                    {"Category"}
                </Button>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={() => handleSelectCategory("")}>All</MenuItem>
                    <MenuItem onClick={() => handleSelectCategory("Pouch Bags")}>Pouch Bags</MenuItem>
                    <MenuItem onClick={() => handleSelectCategory("Clutches")}>Clutches</MenuItem>
                    <MenuItem onClick={() => handleSelectCategory("Mini Bags")}>Mini BAgs</MenuItem>
                </Menu>

                {/* Filter Button */}
                <Button
                    variant="outlined"
                    startIcon={<TuneIcon />}
                    onClick={allFiltersDropDownOpen}
                    sx={{
                        flex: "0 0 auto", // 👈 KEY FIX
                    }}
                >
                    Filters
                </Button>
                <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={allFiltersDropDownClose}>
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


                <Button

                    variant="outlined"
                    onClick={(e) => handleFilterOpen(e, "fabric")}
                    endIcon={<ExpandMoreIcon />}

                    sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        borderColor: "#ccc",
                        color: "#333",
                        backgroundColor: "#fff",
                        flex: "0 0 auto", // 👈 KEY FIX
                    }}

                >
                    Fabric
                </Button>

                <Menu
                    anchorEl={activeAnchorEl}
                    open={activeFilter === "fabric"}
                    onClose={handleFilterClose}

                >
                    <MenuItem onClick={() => handleSelect("")}>All</MenuItem>
                    <MenuItem onClick={() => handleSelect("Electronics")}>Electronics</MenuItem>
                    <MenuItem onClick={() => handleSelect("Clothes")}>Clothes</MenuItem>
                </Menu>


                <Button
                    variant="outlined"
                    endIcon={<ExpandMoreIcon />}
                    onClick={(e) => handleFilterOpen(e, "price")}
                    sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        borderColor: "#ccc",
                        color: "#333",
                        backgroundColor: "#fff",
                        flex: "0 0 auto", // 👈 KEY FIX
                    }}
                >
                    Price
                </Button>

                <Menu anchorEl={activeAnchorEl} open={activeFilter === "price"} onClose={handleFilterClose}>
                    <MenuItem onClick={() => handleSelect("0-50")}>$0 - $50</MenuItem>
                </Menu>


                <Button
                    variant="outlined"
                    endIcon={<ExpandMoreIcon />}
                    onClick={(e) => handleFilterOpen(e, "size")}
                    sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        borderColor: "#ccc",
                        color: "#333",
                        backgroundColor: "#fff",
                        flex: "0 0 auto", // 👈 KEY FIX
                    }}
                >
                    Size
                </Button>

                <Menu anchorEl={activeAnchorEl} open={activeFilter === "size"} onClose={handleFilterClose}>
                    <MenuItem onClick={() => handleSelect("S")}>S</MenuItem>
                    <MenuItem onClick={() => handleSelect("M")}>M</MenuItem>
                    <MenuItem onClick={() => handleSelect("L")}>L</MenuItem>
                </Menu>


                <Button
                    variant="outlined"
                    endIcon={<ExpandMoreIcon />}
                    onClick={(e) => handleFilterOpen(e, "color")}
                    sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        borderColor: "#ccc",
                        color: "#333",
                        backgroundColor: "#fff",
                        flex: "0 0 auto", // 👈 KEY FIX
                    }}
                >
                    Color
                </Button>


                <Menu anchorEl={activeAnchorEl} open={activeFilter === "color"} onClose={handleFilterClose}>
                    <MenuItem onClick={() => handleSelect("Red")}>Red</MenuItem>
                    <MenuItem onClick={() => handleSelect("Blue")}>Blue</MenuItem>
                </Menu>


                <Button
                    variant="outlined"
                    endIcon={<ExpandMoreIcon />}
                    onClick={(e) => handleFilterOpen(e, "brand")}
                    sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        px: 2,
                        py: 1,
                        borderColor: "#ccc",
                        color: "#333",
                        backgroundColor: "#fff",
                        flex: "0 0 auto", // 👈 KEY FIX
                    }}
                >
                    Brand
                </Button>


                <Menu anchorEl={activeAnchorEl} open={activeFilter === "brand"} onClose={handleFilterClose}>
                    <MenuItem onClick={() => handleSelect("Nike")}>Nike</MenuItem>
                    <MenuItem onClick={() => handleSelect("Adidas")}>Adidas</MenuItem>
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
        </Box>
    );
};

export default FilterProduct;