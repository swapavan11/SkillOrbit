import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Upload from "../../Upload";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../../services/operations/courseDetailsAPI";
import { courseActions } from "../../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
function AddModal({ sectionId }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lectureTitle: "",
      lectureDesc: "",
      lectureVideo: null,
    },
  });

  // On form submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("sectionID", sectionId);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);
    const result = await createSubSection(token, formData);
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(courseActions.setCourse(updatedCourse));
    }
    toast.success("Lecture added");
    reset();
    setLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* TRIGGER BUTTON */}
      <DialogTrigger asChild>
        <button className="mt-3 flex items-center gap-x-1 text-yellow-50">
          <FaPlus className="text-lg" />
          <p>Add Lecture</p>
        </button>
      </DialogTrigger>

      <DialogContent className="my-10  w-11/12 max-w-[700px]  rounded-lg border border-richblack-400 bg-richblack-800 ">
        <ScrollArea className=" mr-3 max-h-[70vh]">
          <div>
            {/* Heading */}
            <DialogHeader>
              {/* HEADING */}
              <DialogTitle className="text-left text-xl text-richblack-5">
                Add Lecture
              </DialogTitle>
            </DialogHeader>
            {/* Modal Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 px-8 py-10"
            >
              {/* Lecture Video Upload */}
              <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={null}
                editData={null}
              />
              {/* Lecture Title */}
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm text-richblack-5"
                  htmlFor="lectureTitle"
                >
                  Lecture Title <sup className="text-pink-200">*</sup>
                </label>
                <input
                  disabled={loading}
                  id="lectureTitle"
                  placeholder="Enter Lecture Title"
                  {...register("lectureTitle", { required: true })}
                  className="form-style w-full"
                />
                {errors.lectureTitle && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Lecture title is required
                  </span>
                )}
              </div>
              {/* Lecture Description */}
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm text-richblack-5"
                  htmlFor="lectureDesc"
                >
                  Lecture Description <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                  disabled={loading}
                  id="lectureDesc"
                  placeholder="Enter Lecture Description"
                  {...register("lectureDesc", { required: true })}
                  className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.lectureDesc && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Lecture Description is required
                  </span>
                )}
              </div>
              {/*  SAVE BUTTON */}

              <DialogFooter className="flex flex-row justify-end gap-2">
                <Button disabled={loading} type="submit" variant="yellow">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default AddModal;
