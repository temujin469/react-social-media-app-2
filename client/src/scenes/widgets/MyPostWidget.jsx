import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {
  Divider,
  InputBase,
  useTheme,
  useMediaQuery,
  Box,
  Tabs,
  Tab,
  Skeleton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import useUser from "hooks/useUser";

const MyPostWidget = ({ onChange, tab }) => {
  const { palette } = useTheme();
  const sm = useMediaQuery("(min-width: 760px)");

  const { data: user, isLoading, error } = useUser();

  const navigate = useNavigate();

  return (
    <WidgetWrapper noRounded={!sm} padding="1rem 1rem 0">
      <FlexBetween gap="1rem">
        {isLoading ? (
          <Skeleton variant="circular" width={60} height={60} />
        ) : error ? (
          <Skeleton variant="circular" width={60} height={60} />
        ) : (
          <UserImage image={user.picturePath} />
        )}
        <InputBase
          placeholder="Юу бодож байна..."
          onClick={() => navigate("/addPost")}
          sx={{
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            flex: "1",
            padding: "0 2rem",
            height: "60px",
          }}
        />
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <Box>
        <Tabs value={tab} variant="fullWidth" onChange={onChange}>
          <Tab icon={<ArticleOutlinedIcon />} label="Нийтлэл" id={0} />
          <Tab icon={<InsertEmoticonOutlinedIcon />} label="Найз" id={1} />
          <Tab icon={<BookmarkBorderOutlinedIcon />} label="Хадгалсан" id={2} />
        </Tabs>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
