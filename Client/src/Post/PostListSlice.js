import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./PostListApi";
const initialState = {
  post: [],
  status: "idle",
};

export const fetchPostsAsync = createAsyncThunk(
  "post/fetchPosts",
  // fetching product for all product page according to pagination, sorting, brand
  async (page) => {
    const response = await fetchPosts(page);
    return response.data;
  }
);

export const PostListSlice = createSlice({
  name: "post",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.post = action.payload;
      });
  },
});
export const selectPosts = (state) => state.post.post;
export default PostListSlice.reducer;
