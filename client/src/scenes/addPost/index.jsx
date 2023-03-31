import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ImageUploader from "components/ImageUploader";
import { useSelector } from "react-redux";
import baseUrl from "utils/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import PostSettings from "./PostSettings";
import WidgetWrapper from "components/WidgetWrapper";

const AddPost = () => {
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const xs = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();

  const queryClient = useQueryClient();

  const addPostMutation = useMutation(
    async (body) => {
      return baseUrl.post("/posts", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess: () => {
        setLoading(false);

        queryClient.invalidateQueries("posts");
        navigate("/");
        toast.success("Амжилттай нийтэллээ");
      },
      onError: (err) => {
        setLoading(false);
        toast.error("Алдаа гарлаа");
        console.log(err);
      },
    }
  );

  const handlePost = () => {
    setLoading(true);

    const body = { description, title, image };

    addPostMutation.mutate(body);
  };

  return (
    <Box backgroundColor={palette.background.alt} minHeight="100vh">
      <Navbar title={"Нийтлэл оруулах"} position={xs ? "sticky" : "static"} />
      <Box maxWidth="1000px" mx="auto" pb="70px" pt={xs ? "1rem" : "0"}>
        <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
          <Grid item xs={1} sm={8} md={7}>
            <WidgetWrapper noRounded={!xs} mb="0">
              <Stack gap="1rem" mb={xs ? "1rem" : "0"}>
                <TextField
                  label="Гарчиг"
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  // error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  // helperText={touched.firstName && errors.firstName}
                />
                {/* <TagsInput
        value={tags}
        onChange={setTags}
        name="Шошго"
        placeHolder="Шошго"
      /> */}
                <ImageUploader onChange={setImage} />
                <ReactQuill
                  theme="snow"
                  placeholder="Агуулга"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  value={description}
                  onChange={setDescription}
                />
                <Paper
                  elevation={3}
                  sx={{
                    position: xs ? "static" : "fixed",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "0.5rem",
                  }}
                >
                  <Button
                    disabled={!title}
                    onClick={handlePost}
                    size="large"
                    sx={{
                      color: "white",
                      backgroundColor: palette.primary.main,
                      width: xs ? "130px" : "100%",
                    }}
                  >
                    Хуваалцах
                  </Button>
                </Paper>
              </Stack>
            </WidgetWrapper>
          </Grid>

          <Grid item xs={1} sm={4} md={5} paddingLeft={xs ? "1rem" : "0"}>
            <PostSettings />
          </Grid>
        </Grid>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
export default AddPost;
