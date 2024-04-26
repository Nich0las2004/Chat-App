import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage(state, action) {
      const { message } = action.payload;
      state.messages.push({ message });
    },
  },
});

export const { sendMessage } = messageSlice.actions;
export default messageSlice.reducer;
