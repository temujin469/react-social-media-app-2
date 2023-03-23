import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box
      width="100%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      {isNonMobileScreens && (
        <Box flexBasis="26%" position="sticky" top="2rem" height="100vh">
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
      )}

      <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%" position="sticky" top="2rem" height="100vh">
          <AdvertWidget />
          <Box m="2rem 0" />
          <FriendListWidget userId={_id} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
