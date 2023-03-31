import { Box, Divider, useMediaQuery } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import PostDetailWidget from "scenes/widgets/PostDetailWidget";

function PostDetail() {
  const { postId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // const { userId } = useParams();

  return (
    <Box>
      <Navbar title="Буцах" />
      <Box
        padding="0 1rem"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {isNonMobileScreens && (
          <Box
            flexBasis={isNonMobileScreens ? "26%" : undefined}
            mt="2rem"
            position="sticky"
            top="86px"
            height="100vh"
          >
            <AdvertWidget />
          </Box>
        )}

        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
          <PostDetailWidget postId={postId} />
          <Divider />
        </Box>
      </Box>
    </Box>
  );
}

export default PostDetail;
