import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: function (state, action) {
      state.step = action.payload;
    },
    setCourse: function (state, action) {
      state.course = action.payload;
    },
    setEditCourse: function (state, action) {
      state.editCourse = action.payload;
    },
    setPaymentLoading: function (state, action) {
      state.paymentLoading = action.payload;
    },
    resetCourseState: function (state) {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
      state.paymentLoading = false;
    },
  },
});

export default courseSlice.reducer;
export const courseActions = courseSlice.actions;
