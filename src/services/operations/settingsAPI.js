import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import { userActions } from "../../slices/profileSlice";
import { logout } from "../operations/authAPI";
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

// update user display picture
export function updateDisplayPicture(token, formData) {
  return async (disptach) => {
    const toastId = toast.loading("Loading..");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      //  console.log(response.data);
      toast.success("Updated profile picture successfully");
      disptach(userActions.setUser(response.data.data));
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      //  console.log("Error occurred while updating profile");
      //   console.log(error);
      toast.error("Cannot update profile picture");
    }
    toast.dismiss(toastId);
  };
}
// update profile/additional details api
export function updateProfileData(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating details..");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(userActions.setUser(response.data.data));

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      //  console.log(error.response.data);
      //  console.log(error);
    }
    toast.dismiss(toastId);
    toast.success("Details updated successfully");
  };
}
// change password

// delete account
export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting account");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(logout(navigate));
      toast.success("Account deleted successfully");
    } catch (error) {
      // console.log(error.response.data.message);
      // console.log(error.response);
      toast.error("Cannot delete account");
    }
    toast.dismiss(toastId);
  };
}
