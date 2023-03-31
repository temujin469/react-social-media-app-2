import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getFriends, getUser, patchFriend } from "api/users";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserImage from "../../components/UserImage";
import MyPosts from "./MyPosts";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { PersonRemoveOutlined, PersonAddOutlined } from "@mui/icons-material";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import TabPanel from "components/TabPanel";
import useUser from "hooks/useUser";
import { toast } from "react-hot-toast";

function Profile() {
  const { userId } = useParams();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");
  const [tab, setTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const { token } = useSelector((state) => state);

  const { data: currentUser } = useUser();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["user", userId], () => getUser({ userId, token }));

  const navigate = useNavigate();

  const { data: friends } = useQuery(["friends", userId], () =>
    getFriends({ userId: currentUser?._id, token })
  );
  const isFriend = friends?.find((friend) => friend._id === currentUser?._id);

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
      token,
      friendId: userId,
    });
  };

  return (
    <Box>
      <Box sx={(theme) => ({ backgroundColor: theme.palette.background.alt })}>
        <Box maxWidth="1050px" height={310} marginX="auto">
          <img
            src="https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            alt=""
            style={{
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              height: "310px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box maxWidth="1000px" marginX="auto" padding="0 1rem">
          <Box
            display={isNonMobileScreens ? "flex" : "block"}
            justifyContent="space-between"
            padding="1rem 0"
          >
            <Box
              display="flex"
              flexDirection={isNonMobileScreens ? "row" : "column"}
              gap="0.5rem"
              alignItems="center"
            >
              <Box
                marginTop="-60px"
                sx={{
                  borderWidth: "8px",
                  borderColor: palette.background.alt,
                  borderRadius: "100%",
                }}
              >
                {isLoading ? (
                  <Skeleton variant="circular" width={130} height={130} />
                ) : error ? (
                  <p>Алдаа гарлаа</p>
                ) : (
                  <UserImage image={user.picturePath} size="130px" />
                )}
              </Box>
              <Stack
                justifyContent="end"
                alignItems={isNonMobileScreens ? "start" : "center"}
              >
                {isLoading ? (
                  <>
                    <Skeleton height={50} width={250} />
                    <Skeleton width={100} />
                  </>
                ) : error ? (
                  <p>Алдаа гарлаа</p>
                ) : (
                  <>
                    <Typography variant="h1" fontWeight="500">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="h5" color={palette.neutral.medium}>
                      {user.friends.length} Найзууд
                    </Typography>
                  </>
                )}
              </Stack>
            </Box>
            <Box
              maxWidth={isNonMobileScreens ? "400px" : "auto"}
              width="100%"
              display="flex"
              alignItems="end"
              gap="1rem"
              padding="1rem 0"
            >
              {user?.isMy ? (
                <>
                  <Button
                    onClick={() => navigate("/addPost")}
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<AddCircleOutlinedIcon />}
                  >
                    Нийтлэх
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<CreateOutlinedIcon />}
                  >
                    Засах
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleFriend}
                    size="large"
                    startIcon={
                      isFriend ? (
                        <PersonRemoveOutlined />
                      ) : (
                        <PersonAddOutlined />
                      )
                    }
                  >
                    {isFriend ? "Болих" : "Найзлах"}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<MailLockOutlinedIcon />}
                  >
                    Захиа
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <Divider />
          <Box>
            <Tabs value={tab} variant="fullWidth" onChange={handleChangeTab}>
              <Tab label="Нийтлэл" id={0} />

              <Tab label="Тухай" id={1} />
              <Tab label="Зураг" id={1} />
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Box width="100%" padding="1rem" marginX="auto" maxWidth="1000px">
        <TabPanel value={tab} index={0}>
          <MyPosts />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={tab} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
}

export default Profile;
