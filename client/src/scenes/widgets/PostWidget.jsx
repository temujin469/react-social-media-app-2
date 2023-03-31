import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { patchLike } from "api/posts";
import FlexBetween from "components/FlexBetween";
import PostHead from "components/UserInfo";
import UsersListDrawer from "components/UsersListDrawer";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostWidget = ({ post }) => {
  // const [isComments, setIsComments] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const isLiked = post.likes?.find((like) => like === userId);
  const likeCount = post.likes?.length;
  const navigate = useNavigate();

  // console.log(post);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  // const primary = palette.primary.main;

  const queryClient = useQueryClient();

  const patchLikeMutation = useMutation(patchLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("like");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleLike = () => {
    patchLikeMutation.mutate({ token, postId: post._id });
  };

  return (
    <Paper
      elevation={1}
      sx={(theme) => ({
        borderRadius: "0.50rem",
        backgroundColor: theme.palette.background.alt,
      })}
    >
      <Box mb="1rem">
        <Box>
          <Box p="1rem 1rem 0 1rem">
            <PostHead
              userId={post.user._id}
              name={post.user.firstName}
              subtitle={post.user.email}
              userPicturePath={post.user.picturePath}
            />
          </Box>

          <Button
            variant="text"
            onClick={() => navigate(`/posts/${post._id}/${post.user._id}`)}
            sx={{
              padding: "0.50rem 1rem 1rem 1rem",
              marginTop: "1rem",
              textAlign: "start",
              textTransform: "none",
              fontSize: "17px",
              borderRadius: "0",
              width: "100%",
              justifyContent: "start",
            }}
          >
            <Typography color={main}>{post.title}</Typography>
          </Button>
        </Box>

        {post.picturePath && (
          <img width="100%" height="auto" alt="post" src={post.picturePath} />
        )}
        <Box p="0 1rem 0 1rem ">
          <UsersListDrawer
            postId={post._id}
            open={openDrawer}
            setOpen={setOpenDrawer}
          />
          <FlexBetween>
            <Box>
              {post.likes.length ? (
                <FlexBetween>
                  <IconButton onClick={() => setOpenDrawer(true)}>
                    <FavoriteBorderOutlined fontSize="small" />
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>
              ) : null}
            </Box>

            <FlexBetween>
              <Typography>{post.comments.length}</Typography>
              <IconButton>
                <ChatBubbleOutlineOutlined fontSize="small" />
              </IconButton>
            </FlexBetween>
          </FlexBetween>
          <Divider />
          <FlexBetween p="0.50rem 0 0.50rem 0">
            <FlexBetween gap="1rem">
              <FlexBetween>
                <IconButton onClick={handleLike}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: "#FF1E56" }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                <Typography>Зүрх</Typography>
              </FlexBetween>

              <FlexBetween>
                <IconButton
                //  onClick={() => setIsComments(!isComments)}
                >
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>Сэтгэгдэл</Typography>
              </FlexBetween>
            </FlexBetween>

            <IconButton>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>
        </Box>
        {/* {isComments && (
          <Box mt="0.5rem" p="0 1rem 1rem 1rem">
            {comments?.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )} */}
      </Box>
    </Paper>
  );
};

export default PostWidget;
