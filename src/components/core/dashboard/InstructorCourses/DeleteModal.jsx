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
import { RiDeleteBin6Line } from "react-icons/ri";
function DeleteModal({ loading, courseId, handleDelete }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={loading}
          title="Delete"
          className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md border border-richblack-700 bg-richblack-800 ">
        <DialogHeader>
          <DialogTitle className="text-left text-xl text-richblack-5">
            Do you want to delete this course?
          </DialogTitle>
          <DialogDescription className="text-left text-lg text-richblack-100">
            All the data related to this course will be deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button
            disabled={loading}
            type="button"
            onClick={() => {
              handleDelete(courseId);
            }}
            variant="yellow"
          >
            Delete
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

export default DeleteModal;
