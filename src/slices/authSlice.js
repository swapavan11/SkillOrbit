import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  loading: false,
  signUpData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignUpData: (state, action) => {
      state.signUpData = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
