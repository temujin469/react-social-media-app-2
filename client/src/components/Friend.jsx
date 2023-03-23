import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { getFriends, patchFriend } from "api/users";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate();
  const { _id: userId } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const { data: friends } = useQuery(["friends"], () =>
    getFriends({ userId, token })
  );
  const isFriend = friends?.find((friend) => friend._id === friendId);

  const queryClient = useQueryClient();

  const patchFriendMutation = useMutation(patchFriend, {
    onSuccess: () => {
      // setLoading(false);
      // dispatch(setPosts({ posts }));

      queryClient.invalidateQueries("friends");
      // clearState();
      // toast.success("Амжилттай нийтэллээ");
    },
    onError: (err) => {
      // setLoading(false);
      // toast.error(catchResponseErr(err));
      console.log(err);
    },
  });

  const handleFriend = () => {
    patchFriendMutation.mutate({ userId, token, friendId });
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
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
