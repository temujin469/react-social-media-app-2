import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper, Skeleton, Stack, useMediaQuery } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useNavigate } from "react-router-dom";
import useUser from "hooks/useUser";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const { data: user, isLoading } = useUser();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "56px",
        right: 0,
        display: isNonMobileScreens ? "none" : "block",
      }}
      elevation={3}
    >
      {isLoading ? (
        <Stack
          direction="row"
          spacing={8}
          height="100%"
          justifyContent="center"
          alignItems="stretch"
        >
          <Skeleton width={50} />
          <Skeleton width={50} />
          <Skeleton width={50} />
        </Stack>
      ) : (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => navigate("/")}
            label="Нүүр"
            icon={<ArticleOutlinedIcon />}
          />
          <BottomNavigationAction
            onClick={() => navigate(`/profile/${user._id}`)}
            label="Профайл"
            icon={<PersonOutlineOutlinedIcon />}
          />
          <BottomNavigationAction
            onClick={() => navigate(`/friends/${user._id}`)}
            label="Найз"
            icon={<GroupOutlinedIcon />}
          />
        </BottomNavigation>
      )}
    </Paper>
  );
}
