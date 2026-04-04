// components/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  Select,
  MenuItem,
  IconButton,
  Menu,
  useMediaQuery,
  useTheme,
  Drawer,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBag from "./ShoppingBag";

const Navbar = ({ setMobileOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currency, setCurrency] = useState("PKR");

  const [bagOpen, setBagOpen] = useState(false);

  const [country] = useState("Pakistan");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const searchBar = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#f5f5f5",
        borderRadius: "30px",
        px: 2,
        width: isMobile ? "100%" : "50%",
        mt: isMobile ? 1 : 0,
      }}
    >
      <Select
        defaultValue="All"
        variant="standard"
        disableUnderline
        sx={{ mr: 2 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Clothes">Clothes</MenuItem>
        <MenuItem value="Shoes">Shoes</MenuItem>
      </Select>

      <InputBase
        placeholder='Search for "red wedding dress"'
        sx={{ flex: 1 }}
      />

      <SearchIcon />
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ background: "#fff", color: "#000", borderBottom: "1px solid #eee", px: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* LEFT: Logo + Mobile Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight="bold">
            Looma.PK
          </Typography>
        </Box>

        {/* SEARCH */}
        {isMobile ? searchBar : null}



        {/* DESKTOP: show search bar */}
        {!isMobile && searchBar}

        {/* RIGHT: Deliver / Cart */}
        <Box display="flex" alignItems="center" gap={3}>
          <Box onClick={handleOpen} sx={{ cursor: "pointer", textAlign: "right" }}>
            <Typography variant="caption" color="gray">
              Deliver To / Currency
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              PK / {currency}
            </Typography>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { p: 2, width: 220, borderRadius: 3 } }}
          >
            <Typography variant="subtitle2" mb={1}>Country</Typography>
            <Typography sx={{ background: "#f5f5f5", p: 1, borderRadius: 1, mb: 2 }}>
              {country}
            </Typography>

            <Typography variant="subtitle2" mb={1}>Currency</Typography>
            <Select
              fullWidth
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              size="small"
            >
              <MenuItem value="PKR">PKR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="SAR">SAR</MenuItem>
            </Select>
          </Menu>

          <IconButton onClick={() => setBagOpen(true)}>
            <ShoppingBagOutlinedIcon />
          </IconButton>

          <ShoppingBag bagOpen={bagOpen} setBagOpen={setBagOpen} />

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;