import { Box } from "@mui/material";
import { getPost } from "api/posts";
import PostHead from "components/UserInfo";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

function PostDetailWidget({ postId }) {
  const token = useSelector((state) => state.token);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery(["post", postId], () => getPost({ postId, token }));
  return (
    <Box>
      {!isLoading && !error ? (
        <Box>
          <Box padding="1rem 0">
            <PostHead
              userId={post.user._id}
              userPicturePath={post.user.picturePath}
              subtitle={post.user.lastName}
              name={post.user.firstName}
            />
          </Box>
          <Box>
            <img src={post.picturePath} alt="" />
          </Box>
          <Box mt="1rem">
            <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
          </Box>
        </Box>
      ) : (
        <p>Хайж байна...</p>
      )}
    </Box>
  );
}

export default PostDetailWidget;
