import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/FriendListWidget";

function MyFreinds() {
  const { userId } = useParams();
  return (
    <Box p="1rem">
      <FriendListWidget userId={userId} />
    </Box>
  );
}

export default MyFreinds;
