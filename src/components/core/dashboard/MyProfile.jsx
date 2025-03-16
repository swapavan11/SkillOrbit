import { useSelector } from "react-redux";
import { formattedDate } from "../../../utils/dateFormatter";
import { RiEditBoxLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
function MyProfile() {
  const { loading: profileLoading, user } = useSelector(
    (state) => state.profile,
  );
  const navigate = useNavigate();
  if (profileLoading) {
    return <PropagateLoader color="#afb2bf" />;
  }

  return (
    <div className="w-full p-4 md:p-12 lg:p-16">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex flex-col items-start justify-between gap-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8   sm:flex-row sm:items-center sm:gap-0 sm:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="yellow"
          onClick={() => {
            navigate("/dashboard/settings");
          }}
          className="flex items-center gap-2"
        >
          <span>Edit</span>
          <RiEditBoxLine />
        </Button>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <Button
            variant="yellow"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            className="flex items-center gap-2"
          >
            <span>Edit</span>
            <RiEditBoxLine />
          </Button>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <Button
            variant="yellow"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            className="flex items-center gap-2"
          >
            <span>Edit</span>
            <RiEditBoxLine />
          </Button>
        </div>
        <div className="flex max-w-[500px] flex-col justify-between gap-4  sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-y-5 ">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
