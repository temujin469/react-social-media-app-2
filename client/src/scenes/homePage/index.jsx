import { Box, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useState } from "react";
import TabPanel from "components/TabPanel";
import useUser from "hooks/useUser";
import FriendsPosts from "./FriendsPosts";

const HomePage = () => {
  const sm = useMediaQuery("(min-width:750px)");
  const md = useMediaQuery("(min-width:900px)");
  const [tab, setTab] = useState(0);

  const { data: user, isLoading, error } = useUser();

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box maxWidth="1500px" mx="auto">
      <Grid
        container={sm}
        padding={md ? "1rem" : "0 0 1rem"}
        md={12}
        sm={12}
        xs={12}
      >
        {sm && (
          <Grid
            item
            // position="sticky"
            xs={1}
            sm={5}
            md={3}
            // top="100px"
            // height="100vh"
          >
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <CircularProgress />
            ) : (
              <>
                <UserWidget userId={user._id} />
                <FriendListWidget userId={user._id} />
              </>
            )}
          </Grid>
        )}

        <Grid item sx={1} sm={7} md={6} pl={sm && "1rem"}>
          <Box maxWidth="600px" mx="auto">
            <MyPostWidget tab={tab} onChange={handleChangeTab} />
            <Box px={md ? "0" : "1rem"}>
              <TabPanel value={tab} index={0}>
                <PostsWidget />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <FriendsPosts />
              </TabPanel>
              <TabPanel value={tab} index={2}>
                <PostsWidget />
              </TabPanel>
            </Box>
          </Box>
        </Grid>
        {md && (
          <Grid
            item
            md={3}
            position="sticky"
            pl="1rem"
            top="80px"
            height="100vh"
          >
            <AdvertWidget />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
