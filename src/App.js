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
        sessionStorage.setItem("user", JSON.stringify(session.user));
      } else {
        setUser(null);
        sessionStorage.removeItem("user");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Show Navbar only if logged in */}
      {user && <Navbar setMobileOpen={setMobileOpen} />}

      <Box sx={{ display: "flex" }}>
        {/* Show Sidebar only if logged in */}
        {user && <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />}

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
          <Routes>
            {/* Auth route */}
            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to="/" />}
            />

            {/* Home page - protected */}
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/auth" />}
            />

            {/* Product details */}
            <Route
              path="/product/:id"
              element={user ? <ProductDetailsPage /> : <Navigate to="/auth" />}
            />

            {/* Add product */}
            <Route
              path="/addProduct"
              element={user ? <AddProduct /> : <Navigate to="/auth" />}
            />
          </Routes>
        </Box>
      </Box>

      {/* Optional Footer */}
      {user && <Footer />}
    </BrowserRouter>
  );
}

export default App;