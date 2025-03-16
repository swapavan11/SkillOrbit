import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { LuLogOut } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function LogoutModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 px-8 py-2 text-[1.125rem]">
          <LuLogOut />
          Logout
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md border border-richblack-700 bg-richblack-800 ">
        <DialogHeader>
          <DialogTitle className="text-left text-xl text-richblack-5">
            Are You Sure ?
          </DialogTitle>
          <DialogDescription className="text-left text-lg text-richblack-100">
            You will be logged out of your Account
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button
            type="button"
            onClick={() => {
              dispatch(logout(navigate));
            }}
            variant="yellow"
          >
            Logout
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutModal;
