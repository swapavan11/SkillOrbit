import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { useEffect } from "react";
function Cart() {
  const { totalItems, total } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    //console.log("This is cart ", cart);
  }, []);
  return (
    <div className="w-full p-4 md:p-12 lg:p-16">
      <h1 className="mb-4 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-20 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  );
}

export default Cart;
