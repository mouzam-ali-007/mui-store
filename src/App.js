// App.js
import React, { useState, useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from './store';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetailsPage from "./components/ProductDetailsPage";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import CarousalComponent from "./components/carousal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import { supabase } from "./services/data.service";
import ComingSoon from "./components/CommingSoon";
import ShopStores from "./components/ShopStores";
import WomenPage from "./components/WomenPage";

const HomePage = () => (
  <>
    <CarousalComponent />
    <ShopStores />
    <Home />
  </>
);

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, setUser] = useState(null);

  useEffect(() => {
    if (!supabase?.auth) {
      return undefined;
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
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

          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar setMobileOpen={setMobileOpen} />
                <div className="app-shell">
                  <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
                  <main className="app-shell__content">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/women" element={<WomenPage />} />
                      <Route path="/product/:id" element={<ProductDetailsPage />} />
                      <Route path="/comingsoon" element={<ComingSoon />} />
                    </Routes>
                  </main>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
