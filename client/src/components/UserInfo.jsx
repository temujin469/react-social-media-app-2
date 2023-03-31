import { PersonRemoveOutlined, PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { getFriends, patchFriend } from "api/users";
import useToken from "hooks/useToken";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const UserInfo = ({ userId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user);
  const token = useToken();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const { data: friends } = useQuery(["friends", userId], () =>
    getFriends({ userId: userId, token })
  );
  const isFriend = friends?.find((friend) => friend._id === currentUser._id);

  const isMyPost = userId === currentUser._id;
  const queryClient = useQueryClient();

  const patchFriendMutation = useMutation(patchFriend, {
    onSuccess: () => {
      // setLoading(false);
      if (!isFriend) {
        toast.success("Найзууд болсон");
      } else {
        toast.success("Найзууд салсан");
      }

      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["posts", token]);
    },
    onError: (err) => {
      // setLoading(false);
      // toast.success("Амжилттай нийтэллээ");
      console.log(err);
    },
  });

  const handleFriend = () => {
    patchFriendMutation.mutate({
      userId: currentUser._id,
      token,
      friendId: userId,
    });
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${userId}`);
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
      {!isMyPost && (
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
      )}
    </FlexBetween>
  );
};

export default UserInfo;
