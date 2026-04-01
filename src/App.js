// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import { Box } from "@mui/material";

function App() {
    // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <BrowserRouter>
      <Navbar setMobileOpen={setMobileOpen} />

        <Box sx={{ display: "flex" }} >
       <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }} >
          <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Routes>
      

        <Footer />
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