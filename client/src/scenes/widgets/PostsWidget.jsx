import { Box, Skeleton } from "@mui/material";
import { getAllPost } from "api/posts";
import useToken from "hooks/useToken";
import { useQuery } from "react-query";
import PostWidget from "./PostWidget";

const PostsWidget = () => {
  const token = useToken()
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["posts"], () => getAllPost({ token }));

  // console.log(posts);

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
};

export default PostsWidget;
