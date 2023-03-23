import { Box, Skeleton } from "@mui/material";
import { getAllPost } from "api/posts";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const token = useSelector((state) => state.token);

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["posts", isProfile], () =>
    getAllPost({ userId, token, isProfile })
  );

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
        posts?.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            title,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              title={title}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
