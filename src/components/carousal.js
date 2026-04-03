// components/Carousal.js
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

const items = [

  {
    id: 1,
    img: "/banner2.jpeg",
  },
  {
    id: 2,
    img: "/banner.jpeg",
  },
  {
    id: 3,
    img: "/banner2.jpeg",
  },
];

const CarousalComponent = () => {
  return (
    <div style={{ marginTop: "80px" }}>
      <Carousel
        autoPlay
        interval={3000}
        animation="slide"
        duration={500}
        indicators={true}
        navButtonsAlwaysVisible={true}
        cycleNavigation
        swipe={true}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: "100%",
              height: { xs: 200, md: 350 },
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <img
              src={item.img}
              alt="banner"
              style={{
                width: "100%",
                height: "90%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default CarousalComponent;