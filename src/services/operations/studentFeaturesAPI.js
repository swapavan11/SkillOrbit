import { toast } from "react-hot-toast";
import { studentEndpoints } from "../APIs";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { courseActions } from "../../slices/courseSlice";
import { cartActions } from "../../slices/cartSlice";
const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;
import { apiConnector } from "../apiConnector";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch,
) {
  const toastId = toast.loading("Loading....");

  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    // console.log(
    //   "THIS is response fronm capturePayment backend ",
    //   orderResponse,
    // );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: Number(orderResponse.data.data.amount),
      order_id: orderResponse.data.data.id,
      name: "SkillOrbit",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token,
        );
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      //console.log(response.error);
    });
  } catch (error) {
    // console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  // console.log("This is inside the email", response);
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
  } catch (error) {
    // console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(courseActions.setPaymentLoading(true));
  try {
    // console.log("THis is inside verify payment", bodyData);
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("payment Successful");
    navigate("/dashboard/enrolled-courses");
    dispatch(cartActions.resetCart());
  } catch (error) {
    //  console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(courseActions.setPaymentLoading(false));
}
