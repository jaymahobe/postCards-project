import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./AuthApi";

const initialState = {
  loggedInUser: null,
  isSuccess: false,
  status: "idle",
  error: null, // Add an error state
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearUser: (state) => {
      state.loggedInUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending";
        state.error = null; // Clear any previous errors
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.isSuccess = true;
        // Potentially store JWT token, e.g.:
        // localStorage.setItem('token', action.payload.token);
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.isSuccess = false;
        state.error = action.error; // Capture the error message
      });
  },
});
export const { clearUser } = AuthSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthSuccess = (state) => state.auth.isSuccess;
export const selectAuthError = (state) => state.auth.error;
export default AuthSlice.reducer;
