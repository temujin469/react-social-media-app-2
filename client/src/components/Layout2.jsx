import { Box, useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout2() {
  // const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  return (
    <Box bgcolor={palette.background.alt} minHeight="100vh">
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout2;
