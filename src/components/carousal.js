import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CarousalComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: "80px",
        minHeight: { xs: "52vh", sm: "62vh", md: "78vh" },
        width: "100%",
        backgroundImage:
          "linear-gradient(90deg, rgba(17, 17, 17, 0.38) 0%, rgba(17, 17, 17, 0.12) 35%, rgba(17, 17, 17, 0.02) 100%), url('/VR1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: { xs: "center center", md: "center top" },
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          spacing={2.2}
          sx={{
            maxWidth: { xs: "100%", sm: 420, md: 520 },
            color: "#fff",
            py: { xs: 6, md: 10 },
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            New Arrival
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "2.2rem", sm: "3rem", md: "4.4rem" },
              lineHeight: 1.02,
              fontWeight: 700,
            }}
          >

          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            Because One Bag Isn’t Enough.<br />
            Discover your next favorite carry.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/women")}
              sx={{
                bgcolor: "#ffffff",
                color: "#111",
                px: 3.5,
                py: 1.4,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#f3f3f3",
                },
              }}
            >
              Shop Now
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/women")}
              sx={{
                borderColor: "rgba(255,255,255,0.8)",
                color: "#fff",
                px: 3.5,
                py: 1.4,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Explore Collection
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CarousalComponent;
