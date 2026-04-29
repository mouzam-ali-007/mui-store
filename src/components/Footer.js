import React from "react";
import { Box, Container, Divider, Grid, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const footerSections = [
    {
        title: "Shop",
        links: [
            { label: "All Products", to: "/" },
            { label: "Women", to: "/women" },
            { label: "Men", to: "/comingsoon" },
            { label: "Kids", to: "/comingsoon" },
        ],
    },
    {
        title: "Customer Care",
        links: [
            { label: "Contact Us", to: "/" },
            { label: "Shipping Info", to: "/" },
            { label: "Returns", to: "/" },
            { label: "Order Support", to: "/" },
        ],
    },
    {
        title: "About",
        links: [
            { label: "Our Story", to: "/" },
            { label: "Stores", to: "/" },
            { label: "Privacy Policy", to: "/" },
            { label: "Terms & Conditions", to: "/" },
        ],
    },
];

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                background: "linear-gradient(180deg, #1c1814 0%, #111111 100%)",
                color: "#f5efe8",
                borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
                <Grid container spacing={{ xs: 4, md: 6 }}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                mb: 2,
                            }}
                        >
                            LUMA DEVAUX
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(245, 239, 232, 0.72)",
                                maxWidth: 360,
                                lineHeight: 1.8,
                                mb: 3,
                            }}
                        >
                            Timeless pieces curated for modern wardrobes, with elevated styling,
                            refined details, and a seamless shopping experience.
                        </Typography>
                        <Stack spacing={0.8}>
                            <Typography sx={{ color: "rgba(245, 239, 232, 0.72)" }}>
                                support@lumadevaux.com
                            </Typography>
                            <Typography sx={{ color: "rgba(245, 239, 232, 0.72)" }}>
                                Lahore, Pakistan
                            </Typography>
                        </Stack>
                    </Grid>

                    {footerSections.map((section) => (
                        <Grid item xs={12} sm={4} md={2.66} key={section.title}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, mb: 2, color: "#fff" }}
                            >
                                {section.title}
                            </Typography>
                            <Stack spacing={1.4}>
                                {section.links.map((item) => (
                                    <MuiLink
                                        key={item.label}
                                        component={Link}
                                        to={item.to}
                                        underline="none"
                                        sx={{
                                            color: "rgba(245, 239, 232, 0.72)",
                                            transition: "color 0.2s ease, transform 0.2s ease",
                                            "&:hover": {
                                                color: "#fff",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </MuiLink>
                                ))}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={1.5}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                >
                    <Typography sx={{ color: "rgba(245, 239, 232, 0.62)", fontSize: 14 }}>
                        © 2026 LUMA DEVAUX. All rights reserved.
                    </Typography>
                    <Typography sx={{ color: "rgba(245, 239, 232, 0.62)", fontSize: 14 }}>
                        Secure payments. Fast dispatch. Elevated essentials.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
