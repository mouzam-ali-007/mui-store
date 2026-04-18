// App.js
import React, { useState, useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from './store';
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
import ShopStores from "./components/ShopStores";
import WomenPage from "./components/WomenPage";

// Home page component
const HomePage = () => (
  <>
    <CarousalComponent />
    <ShopStores />
    <Home />

  </>
);



function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);


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
    <Provider store={store}>
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
                  <Navbar setMobileOpen={setMobileOpen} setCheckoutOpen={setCheckoutOpen} />

                  <Box sx={{ display: "flex" }}>
                    <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

                    <Box sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/women" element={<WomenPage />} />
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
    </Provider>
  );
}

export default App;

