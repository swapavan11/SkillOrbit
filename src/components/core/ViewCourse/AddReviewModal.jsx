import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../../services/operations/courseDetailsAPI";
function AddReviewModal() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", "");
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(token, {
      courseId: courseEntireData._id,
      rating: data.courseRating,
      review: data.courseExperience,
    });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="yellow">Add review</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md border border-richblack-700 bg-richblack-800 ">
        <DialogHeader>
          <DialogTitle className="text-left text-xl text-richblack-5">
            Add Review
          </DialogTitle>
        </DialogHeader>
        {/* Modal Body */}
        <div>
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <DialogFooter className="mt-8 flex flex-row justify-end gap-2 self-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="yellow">Submit</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddReviewModal;
