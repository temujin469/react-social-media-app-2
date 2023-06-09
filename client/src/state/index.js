import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
    },
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
