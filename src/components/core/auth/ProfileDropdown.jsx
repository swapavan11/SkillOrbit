import { useDispatch, useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "../../../services/operations/authAPI";
import { NavLink, useNavigate } from "react-router-dom";
function ProfileDropdown() {
  const { user } = useSelector((state) => {
    return state.profile;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout(navigate));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-richblack-100">
          <div className="h-9">
            <img
              src={user.image}
              className="aspect-square h-full rounded-full"
              alt="User profile image"
            />
          </div>
          {<ChevronDown />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-richblack-700 bg-richblack-800 text-richblack-100">
        <DropdownMenuItem
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="cursor-pointer text-richblack-25 data-[highlighted]:bg-richblack-600 data-[highlighted]:text-richblack-5"
        >
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-richblack-700" />
        <DropdownMenuItem
          onClick={() => {
            handleLogout();
          }}
          className="cursor-pointer text-richblack-25 data-[highlighted]:bg-richblack-600 data-[highlighted]:text-richblack-5"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
