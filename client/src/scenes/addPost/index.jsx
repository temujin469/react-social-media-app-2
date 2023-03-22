import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useMutation, useQueryClient } from "react-query";
// import { toast } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import {
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

const AddPost = () => {
  const [image, setImage] = useState(null);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(image);
  // const dispatch = useDispatch();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  const queryClient = useQueryClient();

  // const clearState = () => {
  //   setTitle("");
  //   setContent("");
  // };

  const addPostMutation = useMutation(
    async (formData) => {
      return baseUrl.post("/posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess: () => {
        setLoading(false);
        // dispatch(setPosts({ posts }));

        queryClient.invalidateQueries("posts");
        navigate("/");
        // clearState();
        // toast.success("Амжилттай нийтэллээ");
      },
      onError: (err) => {
        setLoading(false);
        // toast.error(catchResponseErr(err));
        console.log(err);
      },
    }
  );

  const handlePost = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", description);
    formData.append("title", title);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    addPostMutation.mutate(formData);
  };

  return (
    <Box>
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
      <ImageUploader image={image} setImage={setImage} />
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
            // disabled={!post}
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
          {loading && (
            <CircularProgress
              size={24}
              color="primary"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};
export default AddPost;
