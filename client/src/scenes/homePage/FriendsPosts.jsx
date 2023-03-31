import { Box, Skeleton } from "@mui/material";
import { getFriendsPost } from "api/posts";
import useToken from "hooks/useToken";
import React from "react";
import { useQuery } from "react-query";
import PostWidget from "scenes/widgets/PostWidget";

function FriendsPosts() {
  const token = useToken();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["posts", token], () => getFriendsPost({ token }));
  return (
    <>
      {isLoading && !error ? (
        <div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ margin: 1 }}>
              <Skeleton variant="circular" height={"60px"} width="60px" />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Skeleton width="100%" height="60px" />
            </Box>
          </Box>
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: "57%" }} />
          </Skeleton>
        </div>
      ) : (
        posts && posts.map((post) => <PostWidget key={post._id} post={post} />)
      )}
    </>
  );
}

export default FriendsPosts;
