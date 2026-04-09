import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)"
            }}
        >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
                Coming Soon
            </Typography>

            <Typography variant="h6" color="text.secondary" mb={3}>
                We’re working  to bring this section to life.
            </Typography>

            <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                    borderRadius: "20px",
                    padding: "10px 25px"
                }}
            >
                Go Back Home
            </Button>
        </Box>
    );
};

export default ComingSoon;