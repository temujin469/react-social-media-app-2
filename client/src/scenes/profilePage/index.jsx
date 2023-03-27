import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import UserPostsWidget from "scenes/widgets/UserPostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const currentUser = useSelector((state) => state.user);

  const isMyProfile = userId === currentUser._id;

  return (
    <Box
      width="100%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="2rem"
      justifyContent="center"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={userId} />
        <Box m="2rem 0" />
        <FriendListWidget userId={userId} />
        <Box m="2rem 0" />
      </Box>
      <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
        {isMyProfile && (
          <>
            <MyPostWidget />
            <Box m="2rem 0" />
          </>
        )}
        <UserPostsWidget userId={userId} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
