import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./components/layout/RootLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import store from "./store/index";
import { Provider } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyOtp from "./pages/VerifyOtp";
import DashboardTemplate from "./components/layout/DashboardTemplate";
import MyProfile from "./components/core/dashboard/MyProfile";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import Cart from "./components/core/dashboard/Cart/Index";
import Settings from "./components/core/dashboard/settings/Index";
import OpenRoute from "./components/core/auth/OpenRoute";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import AddCourse from "./components/core/dashboard/AddCourse/Index";
import MyCourses from "./components/core/dashboard/MyCourses";
import EditCourse from "./components/core/dashboard/EditCourse/EditCourse";
import CourseDetails from "./pages/CourseDetails";
import Catalog from "./pages/Catalog";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/dashboard/InstructorDashboard/Instructor";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: (
          <OpenRoute>
            <Signup />
          </OpenRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <OpenRoute>
            <Login />
          </OpenRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/forgot-password",
        element: (
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        ),
      },
      {
        path: "/update-password/:token",
        element: (
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        ),
      },
      {
        path: "/verify-email",
        element: (
          <OpenRoute>
            <VerifyOtp />
          </OpenRoute>
        ),
      },
      {
        path: "/dashboard/",
        element: (
          <PrivateRoute>
            <DashboardTemplate />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            path: "/dashboard/my-profile",
            element: <MyProfile />,
          },
          {
            path: "/dashboard/enrolled-courses",
            element: <EnrolledCourses />,
          },
          {
            path: "/dashboard/cart",
            element: <Cart />,
          },
          {
            path: "/dashboard/settings",
            element: <Settings />,
          },
          {
            path: "/dashboard/add-course",
            element: <AddCourse />,
          },
          {
            path: "/dashboard/my-courses",
            element: <MyCourses />,
          },
          {
            path: "/dashboard/edit-course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "/dashboard/instructor",
            element: <Instructor />,
          },
        ],
      },
      {
        path: "/catalog/:categoryId",
        element: <Catalog />,
      },
      {
        path: "/courses/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "/view-course",
        element: <ViewCourse />,
        children: [
          {
            path: "/view-course/:courseId/section/:sectionId/sub-section/:subsectionId",
            element: <VideoDetails />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
