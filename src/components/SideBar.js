import React, { useState } from "react";
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

const SideBar = ({ mobileOpen, setMobileOpen }) => {
  const [openWomen, setOpenWomen] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleWomenClick = () => {
    setOpenWomen(!openWomen);
  };

  const drawerContent = (
    <List sx={{ padding: "20px" }}>
      <ListItemButton>
        <ListItemText primary="All" />
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="New Arrivals" />
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="West" />
      </ListItemButton>

      {/* Women dropdown */}
      <ListItemButton
        onClick={handleWomenClick}
        sx={{
          border: "2px solid #1976d2",
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
            <ListItemText primary="Clothing" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Accessories" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Footwear" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Lingerie and Sleepwear" />
          </ListItemButton>
        </List>
      </Collapse>
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