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
  Paper,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ImageUploader from "components/ImageUploader";
import { useSelector } from "react-redux";
import baseUrl from "utils/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";

const AddPost = () => {
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
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
    <Box>
      <Navbar title={"Нийтлэл оруулах"} />
      <Box padding="2rem 6%">
        <TextField
          label="Гарчиг"
          fullWidth
          // onBlur={handleBlur}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          // error={Boolean(touched.firstName) && Boolean(errors.firstName)}
          // helperText={touched.firstName && errors.firstName}
          sx={{ gridColumn: "span 2" }}
        />
        {/* <p className="text-base my-3 font-medium sm:text-lg text-slate-700 dark:text-light-gray">
        Шошго
      </p>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="Шошго"
        placeHolder="Шошго"
      /> */}
        <p className="text-base my-3 font-medium sm:text-lg text-slate-700 dark:text-light-gray">
          Зураг
        </p>
        <ImageUploader onChange={setImage} />
        <p className="text-base my-3 font-medium sm:text-lg text-slate-700 dark:text-light-gray">
          Агуулга
        </p>

        <div>
          <ReactQuill
            theme="snow"
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
        </div>
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            height: "56px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ padding: "1rem", position: "relative", flex: "1" }}>
            <Button
              disabled={!title}
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                width: isNonMobileScreens ? "130px" : "100%",
              }}
            >
              Хуваалцах
            </Button>
          </Box>
        </Paper>
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
