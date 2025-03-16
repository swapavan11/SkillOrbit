import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
};

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: function (state, action) {
      state.user = action.payload;
    },
    setLoading: function (state, action) {
      state.loading = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
