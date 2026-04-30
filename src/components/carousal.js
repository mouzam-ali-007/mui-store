import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CarousalComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: "80px",

        width: "100%",
        height: "20%",
        backgroundImage:
          "linear-gradient(180deg, rgba(17, 17, 17, 0.12) 0%, rgba(17, 17, 17, 0.18) 35%, rgba(17, 17, 17, 0.62) 100%), url('/VR1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: { xs: "60% center", sm: "center center", md: "center top" },
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: { xs: "flex-end", md: "center" },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Stack
          spacing={2.2}
          sx={{
            maxWidth: { xs: "100%", sm: 420, md: 520 },
            color: "#fff",
            py: { xs: 4, sm: 5, md: 10 },
            pb: { xs: 5, sm: 6, md: 10 },
            alignItems: { xs: "flex-start", md: "flex-start" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 11, sm: 12 },
              letterSpacing: { xs: "0.22em", sm: "0.28em" },
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            New Arrival
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "2rem", sm: "3rem", md: "4.4rem" },
              lineHeight: { xs: 1.06, md: 1.02 },
              fontWeight: 700,
              maxWidth: { xs: 260, sm: 360, md: "none" },
            }}
          >

          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.92rem", sm: "0.98rem", md: "1.05rem" },
              lineHeight: { xs: 1.65, md: 1.8 },
              color: "rgba(255,255,255,0.88)",
              maxWidth: { xs: 290, sm: 360, md: 430 },
            }}
          >
            Because One Bag Isn’t Enough.<br />
            Discover your next favorite carry.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ pt: 1, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/women")}
              fullWidth
              sx={{
                bgcolor: "#ffffff",
                color: "#111",
                px: 3.5,
                py: { xs: 1.25, sm: 1.4 },
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                minWidth: { sm: 150 },
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
              fullWidth
              sx={{
                borderColor: "rgba(255,255,255,0.8)",
                color: "#fff",
                px: 3.5,
                py: { xs: 1.25, sm: 1.4 },
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                minWidth: { sm: 190 },
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
