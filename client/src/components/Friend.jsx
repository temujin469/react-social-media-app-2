import { PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { patchFriend } from "api/users";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import useToken from "hooks/useToken";
import useUser from "hooks/useUser";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate();

  const { data: user } = useUser();
  const token = useToken();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const queryClient = useQueryClient();

  const patchFriendMutation = useMutation(patchFriend, {
    onSuccess: () => {
      // setLoading(false);

      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      // setLoading(false);
      console.log(err);
    },
  });

  const handleFriend = () => {
    if (user) {
      return patchFriendMutation.mutate({ userId: user?._id, token, friendId });
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={handleFriend}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        <PersonRemoveOutlined sx={{ color: primaryDark }} />
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
