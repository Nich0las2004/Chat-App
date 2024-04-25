import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  refreshToken: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.refreshToken = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
