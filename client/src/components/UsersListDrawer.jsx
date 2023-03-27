import { Box, Drawer, Skeleton, Typography } from "@mui/material";
import { getLikeUser } from "api/posts";
import React from "react";
import { useQuery } from "react-query";
import UserInfo from "./UserInfo";

function UsersListDrawer({ postId, open, setOpen }) {
  const {
    data: likeUsers,
    isLoading,
    error,
  } = useQuery(["like", postId], () => getLikeUser({ postId }));

  return (
    <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
      <Box
        maxHeight="70vh"
        overflowY
        padding="1rem"
        gap="1rem"
        display="flex"
        flexDirection="column"
        sx={{ overflowY: "scroll" }}
      >
        {isLoading ? (
          <Skeleton />
        ) : error ? (
          <Typography>Алдаа гарлаа</Typography>
        ) : (
          likeUsers?.map(({ firstName, lastName, picturePath, _id }) => (
            <UserInfo
              name={firstName}
              subtitle={lastName}
              userPicturePath={picturePath}
              userId={_id}
            />
          ))
        )}
      </Box>
    </Drawer>
  );
}

export default UsersListDrawer;
