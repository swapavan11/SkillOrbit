import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? localStorage.getItem("totalItems")
    : 0,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // reset cart
    resetCart: (state) => {
      state.totalItems = 0;
      state.total = 0;
      state.cart = [];
      // Also update the localstorage
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
      localStorage.removeItem("cart");
    },
    // add to cart
    addToCart: function (state, action) {
      const tempCourse = action.payload;
      // Step 1 -> Check if course is already added to cart
      const index = state.cart.findIndex((course) => {
        return course._id === tempCourse._id;
      });
      if (index !== -1) {
        toast.error("Course already added to cart");
        return;
      }
      // Step 2 -> Add course to cart
      state.cart.push(tempCourse);
      // Step 3 -> Update the total cost and items
      state.total += tempCourse.price;
      state.totalItems += 1;
      // Step 4 -> Update the local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      // Step 5 -> Give success toast
      toast.success("Course added to cart");
    },
    // remove from cart
    removeFromCart: function (state, action) {
      const courseId = action.payload;
      // Step 1 -> Check if course is present in cart
      const index = state.cart.findIndex((course) => {
        return course._id === courseId;
      });
      // Step 2 -> If course present then delete from cart
      if (index < 0) {
        return;
      }
      // Step 3 -> Update the values
      state.totalItems--;
      state.total -= state.cart[index].price;
      state.cart.splice(index, 1);
      // Step 4 -> Update localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      // Step 4 -> Give success toast
      toast.success("Course removed from cart");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
