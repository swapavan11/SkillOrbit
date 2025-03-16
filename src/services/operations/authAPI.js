import toast from "react-hot-toast";

import { authActions } from "../../slices/authSlice";
import { cartActions } from "../../slices/cartSlice";
import { userActions } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../APIs";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(authActions.setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      //console.log("SENDOTP API RESPONSE............", response);

      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      // console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(authActions.setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate,
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(authActions.setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      // console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(authActions.setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(authActions.setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      // console.log("LOGIN API RESPONSE............", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(authActions.setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(
        userActions.setUser({ ...response.data.user, image: userImage }),
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      // console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(authActions.setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(authActions.setToken(null));
    dispatch(userActions.setUser(null));
    dispatch(cartActions.resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(authActions.setLoading(true));
    try {
      // console.log(RESETPASSTOKEN_API);
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      // console.log("Reset password token response: " + response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset email sent");
      setEmailSent(true);
    } catch (error) {
      // console.log(error);
      toast.error("Failed to send mail while resetting password");
    }
    dispatch(authActions.setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(authActions.setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      // console.log("Response from API: " + response.data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      // console.log(
      //   "Error occurred while resetting password ",
      //   error.response.data,
      // );
      toast.error("Error occurred while resetting password");
    }
    dispatch(authActions.setLoading(false));
  };
}
