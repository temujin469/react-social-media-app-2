import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { getFriends } from "api/users";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  const { data: friends, isLoading } = useQuery(["friends"], () =>
    getFriends({ userId, token })
  );

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Найзын жагсаалт
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {!isLoading
          ? friends?.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            ))
          : Array(2)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} variant="rounded" width={210} height={50} />
              ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
