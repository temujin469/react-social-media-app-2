import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import UserPostsWidget from "scenes/widgets/UserPostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

function MyPosts() {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  return (
    <Box
      display={isNonMobileScreens ? "flex" : "block"}
      gap="1rem"
      justifyContent="center"
    >
      <Box
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        // width="100%"
        // maxWidth="350px"
      >
        <UserWidget userId={userId} hideHead />
        <Box m="1rem 0" />
        <FriendListWidget userId={userId} />
        <Box m="1rem 0" />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "60%" : undefined}
        // maxWidth="500px"
      >
        <UserPostsWidget userId={userId} />
      </Box>
    </Box>
  );
}

export default MyPosts;
