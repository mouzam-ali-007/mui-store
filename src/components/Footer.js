// components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                mt: 5,
                py: 3,
                textAlign: "center",
                backgroundColor: "#1e1e2f",
                color: "#fff",
            }}
        >
            <Typography>© 2026 MyStore. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;