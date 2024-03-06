import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../Post/PostListSlice";
import authReducer from "../Auth/AuthSlice";
export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
  },
});
