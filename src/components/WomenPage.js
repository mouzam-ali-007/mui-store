import React, { useState } from "react";
import { Box, Button, LinearProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import Home from "../pages/Home";

const WomenPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    // simulate API call (replace with real one)
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* TOP LOADING BAR */}
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

            <Box sx={{ mt: 10, px: 2 }}>
                {/* BACK BUTTON */}
                <Button
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2 }}
                >
                    Back
                </Button>

                {/* 👇 SHOW FILTER ONLY AFTER LOADING */}
                {!loading && <Home />}
            </Box>
        </>
    );
};

export default WomenPage;
