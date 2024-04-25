import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  password: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
        state.username = action.payload.username,
        state.email = action.payload.email,
        state.password = action.payload.password,
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
