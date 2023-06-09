import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import ImageUploader from "components/ImageUploader";
import useSignUp from "hooks/useSignUp";
import useSignIn from "hooks/useSignIn";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("шаардлагатай"),
  lastName: yup.string().required("шаардлагатай"),
  email: yup.string().email("хүчингүй и-мэйл").required("шаардлагатай"),
  password: yup.string().required("заавал оруулан"),
  location: yup.string().required("шаардлагатай"),
  occupation: yup.string().required("шаардлагатай"),
  image: yup.string().required("шаардлагатай"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("хүчингүй и-мэйл").required("шаардлагатай"),
  password: yup.string().required("шаардлагатай"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  image: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("signIn");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isSignIn = pageType === "signIn";
  const isSignUp = pageType === "signUp";

  const signup = useSignUp();
  const signin = useSignIn();

  useEffect(() => {
    if (pageType === "signIn" && signin.success) {
      dispatch(
        setLogin({
          user: signin.user,
          token: signin.user.token,
        })
      );
      return navigate("/");
    }
    if (pageType === "signUp" && signup.success) {
      return setPageType("signIn");
    }
  }, [signin.success, signup.success]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isSignIn) {
      await signin.signIn(values);
    }
    if (isSignUp) {
      await signup.signUp(values);
    }
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isSignUp ? initialValuesLogin : initialValuesRegister}
      validationSchema={isSignIn ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isSignUp && (
              <>
                <TextField
                  label="Нэр"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Овог"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Байршил"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Мэргэжил"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {/* <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("image", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Энд зураг нэмнэ үү</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone> */}
                  <ImageUploader
                    onChange={(acceptedFile) =>
                      setFieldValue("image", acceptedFile)
                    }
                  />
                </Box>
              </>
            )}

            <TextField
              label="Имэйл"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Нууц үг"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isSignIn ? "Нэвтрэх" : "Бүртгүүлэх"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isSignIn ? "signUp" : "signIn");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isSignIn
                ? "Бүртгэлгүй юу? Энд бүртгүүлнэ үү"
                : "Бүртгэлтэй юу? Энд нэвтэрнэ үү."}
            </Typography>
          </Box>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={signin.isLoading || signup.isLoading}
          >
            <CircularProgress />
          </Backdrop>
        </form>
      )}
    </Formik>
  );
};

export default Form;
