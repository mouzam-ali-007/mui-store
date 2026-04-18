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
    <div style={{ marginTop: "80px" }}>
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

              height: { xs: 200, md: 320 },
              borderRadius: "20px 20px 20px 20px",
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto",

            }}
          >
            <img
              src={item.img}
              alt="banner"
              style={{
                width: "100%",
                height: "90%",
                objectFit: "cover",
                borderRadius: "20px 20px 20px 20px",
              }}
            />
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default CarousalComponent;