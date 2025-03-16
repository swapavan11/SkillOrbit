import { profileEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import { userActions } from "../../slices/profileSlice";
import { toast } from "react-hot-toast";
import { logout } from "./authAPI";
const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

// get user datails
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading ....");
    dispatch(userActions.setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log(response.data.userDetails);
    } catch (error) {
      dispatch(logout(navigate));
      // console.log(error.response);
      // console.log(error.data);
    }
    toast.dismiss(toastId);
    dispatch(userActions.setLoading(false));
  };
}

// Get enrolled courses
export async function getEnrolledCourses(token) {
  let enrolledCourses = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    enrolledCourses = response.data.data;
  } catch (error) {
    //  console.log(error?.response?.data?.message);
    //   console.log(error);
    toast.error("Could not fetch courses");
  }
  return enrolledCourses;
}

// get instructor data
export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses;
  } catch (error) {
    // console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
