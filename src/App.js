// App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductDetailsPage from "./components/ProductDetailsPage";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { Box } from "@mui/material";
import CarousalComponent from "./components/carousal";
import ProductCard from "./components/ProductCard";
import AddProduct from "./components/AddProduct";
import FilterProduct from "./components/FilterProduct";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage"; // your login/signup page
import { supabase } from "./services/data.service"; // your Supabase client
import ComingSoon from "./components/CommingSoon";

// Home page component
const HomePage = () => (
  <>
    <CarousalComponent />
    <FilterProduct />
    <Home />
  </>
);

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);


  // Check session on mount
  useEffect(() => {
    // const session = supabase.auth.session();
    // if (session?.user) {
    //   setUser(session.user);
    //   sessionStorage.setItem("user", JSON.stringify(session.user));
    // }

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        //  sessionStorage.setItem("user", JSON.stringify(session.user));
      } else {
        setUser(null);
        //  sessionStorage.removeItem("user");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Route (NO layout) */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/addProduct" element={<AddProduct />} />

        {/* Protected Layout */}
        <Route
          path="/*"
          element={
            (
              <>
                <Navbar setMobileOpen={setMobileOpen} />

                <Box sx={{ display: "flex" }}>
                  <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

                  <Box sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/product/:id" element={<ProductDetailsPage />} />


                      <Route path="/comingsoon" element={<ComingSoon />} />
                    </Routes>
                  </Box>
                </Box>

                <Footer />
              </>
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

