import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Skeleton,
  Stack,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getUser } from "api/users";
import { useSelector } from "react-redux";

const UserWidget = ({ userId, hideHead }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const { token } = useSelector((state) => state);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["user", userId], () => getUser({ userId, token }));

  return (
    <WidgetWrapper>
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={210} height={50} />
          <Skeleton variant="rounded" width={210} height={100} />
        </Stack>
      ) : error ? (
        <Typography>Алдаа гарлаа</Typography>
      ) : (
        user && (
          <>
            {!hideHead && (
              <div>
                {/* FIRST ROW */}
                <FlexBetween
                  gap="0.5rem"
                  pb="1.1rem"
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  <FlexBetween gap="1rem">
                    <UserImage image={user.picturePath} />
                    <Box>
                      <Typography
                        variant="h4"
                        color={dark}
                        fontWeight="500"
                        sx={{
                          "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                          },
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography color={medium}>
                        {user.friends.length} найзууд
                      </Typography>
                    </Box>
                  </FlexBetween>
                  <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />
              </div>
            )}

            {/* SECOND ROW */}
            <Box p="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                <Typography color={medium}>{user.location}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem">
                <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                <Typography color={medium}>{user.occupation}</Typography>
              </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
              <FlexBetween mb="0.5rem">
                <Typography color={medium}>
                  Таны профайлыг хэн үзсэн бэ
                </Typography>
                <Typography color={main} fontWeight="500">
                  {user.viewedProfile}
                </Typography>
              </FlexBetween>
              <FlexBetween>
                <Typography color={medium}>
                  Таны нийтлэлийн сэтгэгдэл
                </Typography>
                <Typography color={main} fontWeight="500">
                  {user.impressions}
                </Typography>
              </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
              <Typography
                fontSize="1rem"
                color={main}
                fontWeight="500"
                mb="1rem"
              >
                Нийгмийн сүлжээ
              </Typography>

              <FlexBetween gap="1rem" mb="0.5rem">
                <FlexBetween gap="1rem">
                  <img src="../assets/twitter.png" alt="twitter" />
                  <Box>
                    <Typography color={main} fontWeight="500">
                      Twitter
                    </Typography>
                    <Typography color={medium}>Олон нийтийн сүлжээ</Typography>
                  </Box>
                </FlexBetween>
                {/* <EditOutlined sx={{ color: main }} /> */}
              </FlexBetween>

              <FlexBetween gap="1rem">
                <FlexBetween gap="1rem">
                  <img src="../assets/linkedin.png" alt="linkedin" />
                  <Box>
                    <Typography color={main} fontWeight="500">
                      Linkedin
                    </Typography>
                    <Typography color={medium}>Олон нийтийн сүлжээ</Typography>
                  </Box>
                </FlexBetween>
                {/* <EditOutlined sx={{ color: main }} /> */}
              </FlexBetween>
            </Box>
          </>
        )
      )}
    </WidgetWrapper>
  );
};

export default UserWidget;
