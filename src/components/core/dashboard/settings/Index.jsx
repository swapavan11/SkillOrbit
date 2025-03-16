import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
function Settings() {
  return (
    <div className="w-full p-4 md:p-12 lg:p-16">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <ChangeProfilePicture />
      <EditProfile />
      <DeleteAccount />
    </div>
  );
}

export default Settings;
