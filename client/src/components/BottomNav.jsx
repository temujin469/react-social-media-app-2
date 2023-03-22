import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper, useMediaQuery } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: isNonMobileScreens ? "none" : "block",
      }}
      elevation={3}
    >
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
          onClick={() => navigate(`/profile/${_id}`)}
          label="Профайл"
          icon={<PersonOutlineOutlinedIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate(`/friends/${_id}`)}
          label="Найз"
          icon={<GroupOutlinedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
