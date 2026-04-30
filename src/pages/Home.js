import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/data.service";
import { LinearProgress } from "@mui/material";
import FilterProduct from "../components/FilterProduct";
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [savedProducts, setStoredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get("q")?.trim().toLowerCase() || "";
    const selectedCategory = searchParams.get("category") || "";
    const inStockOnly = searchParams.get("inStock") === "true";
    const sortBy = searchParams.get("sort") || "";
    const hasActiveFilters = Boolean(searchTerm || selectedCategory || inStockOnly || sortBy);

    const updateFilterParam = (key, value) => {
        const nextParams = new URLSearchParams(searchParams);

        if (!value) {
            nextParams.delete(key);
        } else {
            nextParams.set(key, value);
        }

        setSearchParams(nextParams);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    useEffect(() => {
        getProducts().then((data) => {
            if (!data) {
                setStoredProducts([]);
                return;
            }

            const updatedProducts = data.map((item) => {
                const discount = 20; // static for now OR calculate later
                const category = item.category || item.name || "General";

                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    image: item.image,

                    // required UI fields
                    brand: "De Mellier", // static or from API later
                    price: item.price,
                    oldPrice: (item.price * 1.2).toFixed(2), // fake old price
                    discount: discount,
                    rating: 5.0, // static for now
                    express: true,
                    inStock: item.in_stock ?? true,
                    category,
                    details: [
                        { label: "Bag Style", value: "This exquisite Festive/Party Wear Bag set boasts a bright lavender color scheme, perfect for summer wear. The cotton shirt features intricate embroidery, while the farshi shalwar bottoms and Bemberg crinkle chiffon dupatta add a touch of elegance. Ideal for special occasions, this 3-piece set from Haraj Collections exudes charm and sophistication." },
                    ],
                    images: [item.image, item.image, item.image],
                    sizes: ["S", "M", "L", "XL"]
                };
            });

            setStoredProducts(updatedProducts);
        });
    }, []);

    const categories = useMemo(
        () => [...new Set(savedProducts.map((product) => product.category).filter(Boolean))],
        [savedProducts]
    );

    const filteredProducts = useMemo(() => {
        const filtered = savedProducts.filter((product) => {
            const matchesSearch =
                !searchTerm ||
                product.name?.toLowerCase().includes(searchTerm) ||
                product.brand?.toLowerCase().includes(searchTerm) ||
                product.description?.toLowerCase().includes(searchTerm) ||
                product.category?.toLowerCase().includes(searchTerm);

            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            const matchesStock = !inStockOnly || product.inStock;

            return matchesSearch && matchesCategory && matchesStock;
        });

        if (sortBy === "price-asc") {
            return [...filtered].sort((first, second) => Number(first.price) - Number(second.price));
        }

        if (sortBy === "price-desc") {
            return [...filtered].sort((first, second) => Number(second.price) - Number(first.price));
        }

        return filtered;
    }, [inStockOnly, savedProducts, searchTerm, selectedCategory, sortBy]);

    const bestCollectionProducts = useMemo(
        () => savedProducts.slice(0, 4),
        [savedProducts]
    );



    return (
        <>

            {loading && (
                <LinearProgress
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 2000,
                    }}
                />
            )}
            <Container sx={{ mt: 15 }}>


                <FilterProduct
                    category={selectedCategory}
                    categories={categories}
                    inStock={inStockOnly}
                    sortBy={sortBy}
                    onCategoryChange={(value) => updateFilterParam("category", value)}
                    onInStockChange={(checked) => updateFilterParam("inStock", checked ? "true" : "")}
                    onSortChange={(value) => updateFilterParam("sort", value)}
                    onClearFilters={() => {
                        const nextParams = new URLSearchParams(searchParams);
                        nextParams.delete("category");
                        nextParams.delete("inStock");
                        nextParams.delete("sort");
                        setSearchParams(nextParams);
                    }}
                />

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    All Products
                </Typography>

                <Grid container spacing={{ xs: 2, sm: 3 }}>
                    {filteredProducts.map((product) => (
                        <Grid item key={product.id} xs={6} sm={6} md={3} lg={2} sx={{ display: "flex" }}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>

                {!loading && filteredProducts.length === 0 && (
                    <Typography sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}>
                        No products matched your search or filters.
                    </Typography>
                )}

                {!hasActiveFilters && bestCollectionProducts.length > 0 && (
                    <Box sx={{ mb: 6, mt: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
                        >
                            Our Best Collection
                        </Typography>
                        <Typography
                            sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
                        >
                            A curated selection of four standout pieces from our latest range.
                        </Typography>

                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                            {bestCollectionProducts.map((product) => (
                                <Grid item key={`best-${product.id}`} xs={6} sm={6} md={3} sx={{ display: "flex" }}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}


            </Container>
        </>

    );
};

export default Home;
