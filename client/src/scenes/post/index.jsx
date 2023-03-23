import { Box } from "@mui/material";
import { getPost } from "api/posts";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";

function PostDetail() {
  const { postId } = useParams();
  const token = useSelector((state) => state.token);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery(["post", postId], () => getPost({ postId, token }));

  return (
    <Box>
      <Navbar title="Буцах" />
      <Box>
        {!isLoading && !error ? (
          <Box>
            <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
          </Box>
        ) : (
          <p>Хайж байна...</p>
        )}
      </Box>
    </Box>
  );
}

export default PostDetail;
