import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { getUserSession, signOut } from "../services/data.service";
import { useNavigate } from "react-router-dom";
const SideBar = ({ mobileOpen, setMobileOpen }) => {
  const [openWomen, setOpenWomen] = useState(false);
  const [user, setUser] = useState(true);

  const navigate = useNavigate();

  const handleWomenClick = () => {
    setOpenWomen(!openWomen);
  };

  useEffect(() => {

    const getSession = async () => {
      const res = await getUserSession()

      if (res) {
        setUser(res.session);
      }

    };

    getSession();

  }, []);

  const handleLogout = async () => {
    const res = await signOut();

    if (res) {
      setUser(null);
      navigate("/");
    }

  };

  const drawerContent = (
    <List sx={{ padding: "20px" }}>
      <ListItemButton onClick={() => {
        navigate("/");
        setMobileOpen(false);
      }}>
        <ListItemText primary="All" />
      </ListItemButton>

      <ListItemButton onClick={() => {
        navigate("/comingsoon");
        setMobileOpen(false);
      }}>
        <ListItemText primary="Men" />
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
          <ListItemButton sx={{ pl: 4 }} onClick={() => {
            navigate("/women");
            setMobileOpen(false);
          }}>
            <ListItemText primary="Pouch Bags" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={() => {
            navigate("/women");
            setMobileOpen(false);
          }}>
            <ListItemText primary="Clutches" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={() => {
            navigate("/women");
            setMobileOpen(false);
          }}>
            <ListItemText primary="Mini Bags" />
          </ListItemButton>


        </List>
      </Collapse>

      <ListItemButton onClick={() => {
        navigate("/comingsoon");
        setMobileOpen(false);
      }}>
        <ListItemText primary="Kids" />
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
    <Drawer
      variant="temporary"
      anchor="left"
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
  );
};

export default SideBar;
