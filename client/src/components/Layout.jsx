import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "scenes/navbar";
import BottomNav from "./BottomNav";

function Layout() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar isHomePage />

      <Box width="100%" padding="2rem 6%">
        <div className="pb-16">
          <Outlet />
        </div>
        <Box
          sx={{
            display: isNonMobileScreens ? "none" : "block",
          }}
        >
          <BottomNav />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
