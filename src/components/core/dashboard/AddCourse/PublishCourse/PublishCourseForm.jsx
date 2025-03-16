import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { courseActions } from "../../../../../slices/courseSlice";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
function PublishCourseForm() {
  // FORM SET UP
  const { register, handleSubmit, setValue, getValues } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SETTING UP GLOBAL STATES
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  // SETTIGN UP LOCAL STATES
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(courseActions.setStep(2));
  };

  const goToCourses = () => {
    dispatch(courseActions.resetCourseState());
    navigate("/dashboard/my-courses");
  };

  async function handleCoursePublish() {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append(
      "status",
      getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT,
    );
    const result = await editCourseDetails(token, formData);
    if (result) {
      toast.success("Course status updated");
      goToCourses();
    }
    setLoading(false);
  }
  const onSubmit = (data) => {
    // console.log(data)
    handleCoursePublish();
  };
  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <Button variant="yellow" disabled={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PublishCourseForm;
