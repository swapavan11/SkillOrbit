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
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function LoginModal({ open = false, setOpen, para }) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] rounded-md border border-richblack-700 bg-richblack-800 ">
        <DialogHeader>
          <DialogTitle className="text-left text-xl text-richblack-5">
            You are not logged in!
          </DialogTitle>
          <DialogDescription className="text-left text-lg text-richblack-100">
            {para}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
            variant="yellow"
          >
            Login
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

export default LoginModal;
