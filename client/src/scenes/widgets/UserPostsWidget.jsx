import { Box, Skeleton } from "@mui/material";
import { getUserAllPost } from "api/posts";
import { useQuery } from "react-query";
import PostWidget from "./PostWidget";

const UserPostsWidget = ({ userId }) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["posts", userId], () => getUserAllPost({ userId }));

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
        posts?.map((post) => <PostWidget post={post} />)
      )}
    </>
  );
};

export default UserPostsWidget;
