import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
