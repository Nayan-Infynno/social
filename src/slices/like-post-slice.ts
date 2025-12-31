import { createSlice } from "@reduxjs/toolkit";
import { ILikePostSlice } from "../types";

const initialState: ILikePostSlice = {
  likePost: [],
};

const likePostSlice = createSlice({
  name: "likePost",
  initialState,
  reducers: {
    setLikePost(state, action) {
      state.likePost.push(action?.payload);
      console.log("action --", state.likePost);
    },
    removeLikePost(state, action) {
      state.likePost = state.likePost.filter(
        (item: number) => item !== action?.payload
      );
    },
    clearStore(state) {
      state.likePost = [];
    },
  },
});

export const { setLikePost, removeLikePost, clearStore } =
  likePostSlice.actions;
export default likePostSlice.reducer;
