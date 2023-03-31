import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout2() {
  return (
    <Box minHeight="100vh">
      <Outlet />
    </Box>
  );
}

export default Layout2;
