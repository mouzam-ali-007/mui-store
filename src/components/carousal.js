// components/Carousal.js
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

const items = [

  {
    id: 1,
    img: "/banner1.jpg",
  },

  {
    id: 2,
    img: "/banner2.avif",
  },
];

const CarousalComponent = () => {
  return (
    <Box
      sx={{
        mt: "80px",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Carousel
        autoPlay
        interval={3000}
        animation="slide"
        duration={500}
        indicators={true}
        navButtonsAlwaysVisible={false}
        cycleNavigation
        swipe={true}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: "100%",
              height: { xs: 220, sm: 280, md: 360, lg: 420 },
              bgcolor: "#f6f1e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={item.img}
              alt="banner"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarousalComponent;
