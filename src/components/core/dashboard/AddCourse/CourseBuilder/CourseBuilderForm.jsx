import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  createSection,
  updateSection,
  deleteSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { courseActions } from "../../../../../slices/courseSlice";
import { Button } from "@/components/ui/button";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import NestedView from "./NestedView";
function CourseBuilderForm() {
  const dispatch = useDispatch();
  // global state
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  // Loading state
  const [loading, setLoading] = useState(false);

  const [editSectionName, setEditSectionName] = useState(null);

  // useForm hook
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitHandler(data) {
    setLoading(true);
    //console.log("SubmitHandler ", data);
    let result = null;
    if (editSectionName) {
      result = await updateSection(token, {
        courseId: course._id,
        sectionName: data.sectionName,
        sectionId: editSectionName,
      });
    } else {
      result = await createSection(token, {
        courseId: course._id,
        sectionName: data.sectionName,
      });
    }
    //console.log(result);
    if (result) {
      dispatch(courseActions.setCourse(result));
      setValue("sectionName", "");
      editSectionName
        ? toast.success("Section updated")
        : toast.success("Section created");
      setEditSectionName(null);
    }
    setLoading(false);
  }

  function cancelEdit() {
    setValue("sectionName", "");
    setEditSectionName(null);
  }

  function handleSectionNameEdit(sectionId, sectionName) {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    } else {
      setEditSectionName(sectionId);
      setValue("sectionName", sectionName);
    }
  }

  function goToNext() {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(courseActions.setStep(3));
  }

  function goBack() {
    dispatch(courseActions.setEditCourse(true));
    dispatch(courseActions.setStep(1));
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <Button
            type="submit"
            className="flex items-center gap-2 border border-yellow-50 bg-transparent text-yellow-50"
            disabled={loading}
          >
            <p>{editSectionName ? "Edit Section Name" : "Create Section"}</p>
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </Button>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleSectionNameEdit} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <Button
          onClick={goBack}
          variant="normal"
          className="bg-richblack-400 text-richblack-900"
        >
          Back
        </Button>
        <Button
          disabled={loading}
          className="flex items-center gap-[1px] px-3"
          onClick={goToNext}
          variant="yellow"
        >
          <p>Next</p>
          <MdNavigateNext size={16} />
        </Button>
      </div>
    </div>
  );
}

export default CourseBuilderForm;
