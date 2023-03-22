import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sharely
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "auto"}
        p={isNonMobileScreens ? "2rem" : "1rem"}
        m={isNonMobileScreens ? "2rem auto" : " 1rem"}
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Sharely-д тавтай морил!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
