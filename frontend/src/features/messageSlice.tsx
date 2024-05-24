import { createSlice } from "@reduxjs/toolkit";

type Message = {
  id: number;
  user: string;
  message: string;
};

type State = {
  idCounter: number;
  messages: Message[];
};

const initialState: State = {
  idCounter: 0,
  messages: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage(state, action) {
      const { user, message } = action.payload;
      state.messages.push({
        id: state.idCounter,
        user,
        message,
      });
      state.idCounter++;
    },
  },
});

export const { sendMessage } = messageSlice.actions;
export default messageSlice.reducer;
