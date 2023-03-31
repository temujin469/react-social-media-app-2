import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "scenes/navbar";
import BottomNav from "./BottomNav";

function Layout() {
  const md = useMediaQuery("(min-width:900px)");
  const { palette } = useTheme();

  return (
    <Box bgcolor={palette.background.default}>
      <Navbar isHomePage position={md ? "sticky" : "static"} />
      <Box width="100%">
        <div className="pb-10">
          <Outlet />
        </div>
        <Box
          sx={{
            display: md ? "none" : "block",
          }}
        >
          <BottomNav />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
