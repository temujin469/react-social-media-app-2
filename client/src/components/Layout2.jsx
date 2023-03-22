import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "scenes/navbar";

function Layout2() {
  // const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />

      <Box width="100%" padding="2rem 6%">
        <div className="pb-16">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}

export default Layout2;
