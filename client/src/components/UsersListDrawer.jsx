import { Box, Drawer, Skeleton, Typography } from "@mui/material";
import { getLikeUser } from "api/posts";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

function UsersListDrawer({ postId, open, setOpen }) {
  const token = useSelector((state) => state.token);
  const {
    data: likeUsers,
    isLoading,
    error,
  } = useQuery(["like", postId], () => getLikeUser({ postId, token }));

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
              key={_id}
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
