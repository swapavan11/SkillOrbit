import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleOnDelete() {
    const confirm = window.confirm(
      "Are you sure you want to delete your account?",
    );
    if (confirm) {
      dispatch(deleteAccount(token, navigate));
    }
  }
  return (
    <div className="mt-12 flex items-start gap-4 rounded-md border border-pink-700 bg-pink-900 p-8 px-12">
      {/* ICON */}
      <div className="">
        <span className="mt-1 inline-block rounded-full bg-pink-700 p-3 ">
          <FiTrash2 className="text-[2rem]  text-pink-50" />
        </span>
      </div>
      {/* TEXT */}
      <div className="w-full space-y-4 ">
        <h1 className="text-2xl font-semibold text-richblack-5">
          Delete Account
        </h1>
        <p className="w-2/3  text-pink-25">
          Would you like to delete account? <br /> <br /> This account may
          contain Paid Courses.
          <br /> Deleting your account is permanent and will remove all the
          contain associated with it.
        </p>
        <button onClick={handleOnDelete} className="italic text-pink-300">
          I want to delete my account
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
