// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Contact from "./pages/Contact";
import ProductDetailsPage from "./components/ProductDetailsPage";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import { Box } from "@mui/material";
import CarousalComponent from "./components/carousal";
import ProductCard from "./components/ProductCard";
import AddProduct from "./components/AddProduct";
import FilterProduct from "./components/FilterProduct";

const HomePage = () => (
  <>
    <CarousalComponent />
    <FilterProduct />
    <Home />
  </>
);

function App() {
  // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <BrowserRouter>
      <Navbar setMobileOpen={setMobileOpen} />

      <Box sx={{ display: "flex" }} >
        <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: "hidden" }} >

          <Routes>
            {/* HOME PAGE */}
            <Route
              path="/"
              element={
                <>
                  <HomePage />
                </>
              }
            />

            <Route path="/product/:id" element={<ProductDetailsPage />} />

            <Route path="/addProduct" element={<AddProduct />} />

          </Routes>

          {/* <Footer /> */}
        </Box>
      </Box>


      {/* <Routes>
        
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
       
      </Routes> */}


    </BrowserRouter>
  );
}

export default App;