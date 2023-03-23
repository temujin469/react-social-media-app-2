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
import Friend from "components/Friend";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  title,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  // const primary = palette.primary.main;

  const queryClient = useQueryClient();

  const patchLikeMutation = useMutation(patchLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleLike = () => {
    patchLikeMutation.mutate({ token, userId: loggedInUserId, postId });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "0.75rem",
      }}
      bgcolor={palette.background.alt}
    >
      <Box m="2rem 0">
        <Box>
          <Box p="1rem 1rem 0 1rem">
            <Friend
              friendId={postUserId}
              name={name}
              subtitle={location}
              userPicturePath={userPicturePath}
            />
          </Box>

          <Button
            variant="text"
            onClick={() => navigate(`/posts/${postId}`)}
            sx={{
              padding: "0.50rem 1rem 1rem 1rem",
              marginTop: "1rem",
              textAlign: "start",
              textTransform: "none",
              fontSize: "17px",
            }}
          >
            <Typography color={main}>{title}</Typography>
          </Button>
        </Box>

        {picturePath && (
          <img width="100%" height="auto" alt="post" src={picturePath} />
        )}
        <FlexBetween p="0.50rem 1rem 0.50rem 1rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={handleLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: "#FF1E56" }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
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
        )}
      </Box>
    </Paper>
  );
};

export default PostWidget;
