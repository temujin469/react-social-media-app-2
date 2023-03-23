import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import ProtectedRoute from "components/ProtectedRoute";
import Layout from "components/Layout";
import AddPost from "scenes/addPost";
import MyFreinds from "scenes/myFriends";
import Layout2 from "components/Layout2";
import PostDetail from "scenes/post";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/login"
              element={isAuth ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/friends/:userId" element={<MyFreinds />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
              </Route>
            </Route>
            <Route element={<Layout2 />}>
              <Route path="/addPost" element={<AddPost />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
