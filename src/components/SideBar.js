import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { signOut } from "../services/data.service";
import { useNavigate } from "react-router-dom";

import { createClient } from '@supabase/supabase-js'


let url = 'https://hrjxxzzumohxrhrmflxk.supabase.co'

let anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyanh4enp1bW9oeHJocm1mbHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNjgwNzcsImV4cCI6MjA5MDg0NDA3N30.0Gw8I2hVgMQmfHSoCw057WkOz4JslLdS1ZmxsuVyT38'


export const supabase = createClient(url, anon_key)

const SideBar = ({ mobileOpen, setMobileOpen }) => {
  const [openWomen, setOpenWomen] = useState(false);
  const [user, setUser] = useState(true);


  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleWomenClick = () => {
    setOpenWomen(!openWomen);
  };

  useEffect(() => {



    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session);
    };

    getSession();

  }, [user]);

  const handleLogout = async () => {
    const res = signOut();

    if (res) {
      navigate("/");
    }

  };

  const drawerContent = (
    <List sx={{ padding: "20px" }}>
      <ListItemButton>
        <ListItemText primary="All" onClick={() => navigate("/")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Men" onClick={() => navigate("/comingsoon")} />
      </ListItemButton>



      {/* Women dropdown */}
      <ListItemButton
        onClick={handleWomenClick}
        sx={{
          border: "1px solid",
          borderRadius: "12px",
          mb: 1
        }}
      >
        <ListItemText primary="Women" />
        {openWomen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>



      <Collapse in={openWomen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Pouch Bags" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Clutches" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Mini Bags" />
          </ListItemButton>


        </List>
      </Collapse>

      <ListItemButton>
        <ListItemText primary="Kids" onClick={() => navigate("/comingsoon")} />
      </ListItemButton>

      {user && <ListItemButton
        onClick={handleLogout}
        sx={{
          mt: 3,
          borderTop: "1px solid #eee",
          color: "red",
          borderRadius: "8px"
        }}
      >
        <ListItemText primary="Sign Out" />
      </ListItemButton>}
    </List>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 260,
            }
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Drawer */
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 260,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 260,
              boxSizing: "border-box",
              padding: "20px",
              top: "64px",
            }
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default SideBar;