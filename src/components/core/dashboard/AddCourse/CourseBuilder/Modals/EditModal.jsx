import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Upload from "../../Upload";
import { MdEdit } from "react-icons/md";
import { updateSubSection } from "../../../../../../services/operations/courseDetailsAPI";
import { courseActions } from "../../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
function EditModal({ editData }) {
  // some local states
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // global states
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  // setting up form
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Update the fields if form is in view or edit mode
  useEffect(() => {
    setValue("lectureTitle", editData?.title);
    setValue("lectureDesc", editData?.description);
    setValue("lectureVideo", editData?.videoURL);
  }, []);

  // check if form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== editData.title ||
      currentValues.lectureDesc !== editData.description ||
      currentValues.lectureVideo !== editData.videoURL
    ) {
      return true;
    } else return false;
  };

  // Handle edit subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", editData.sectionId);
    formData.append("subSectionId", editData._id);

    // add updated values to formData
    if (currentValues.lectureTitle !== editData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== editData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== editData.videoURL) {
      formData.append("video", currentValues.lectureVideo);
    }
    // set loading
    setLoading(false);
    const result = await updateSubSection(token, formData);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === editData.sectionId ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(courseActions.setCourse(updatedCourse));
    }
    setLoading(false);
  };

  // On form submit
  const onSubmit = async (data) => {
    // console.log(data);
    if (!isFormUpdated()) {
      toast.error("No changes made to form");
    } else {
      await handleEditSubsection();
      toast.success("Lecture updated");
      setOpen(false);
    }
    return;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* TRIGGER BUTTON */}
      <DialogTrigger asChild>
        <button disabled={loading} title="Edit lecture">
          <MdEdit className="text-xl  text-richblack-300 transition-all duration-300 hover:text-caribbeangreen-600" />
        </button>
      </DialogTrigger>

      <DialogContent className="my-10  w-11/12 max-w-[700px]  rounded-lg border border-richblack-400 bg-richblack-800 ">
        <ScrollArea className=" mr-3 max-h-[70vh]">
          <div>
            {/* Heading */}
            <DialogHeader>
              {/* HEADING */}
              <DialogTitle className="text-left text-xl text-richblack-5">
                Editing Lecture
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
                editData={editData?.videoURL}
              />
              {/* Lecture Title */}
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm text-richblack-5"
                  htmlFor="lectureTitle"
                >
                  Lecture Title
                  <sup className="text-pink-200">*</sup>
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
                  Lecture Description
                  <sup className="text-pink-200">*</sup>
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

export default EditModal;
