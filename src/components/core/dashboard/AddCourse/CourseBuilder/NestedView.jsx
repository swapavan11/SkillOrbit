import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { CiVideoOn } from "react-icons/ci";
import { useState } from "react";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { courseActions } from "../../../../../slices/courseSlice";
import DeleteModal from "./DeleteModal";
import { toast } from "react-hot-toast";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import ViewModal from "./Modals/ViewModal";
function NestedView({ handleChangeEditSectionName }) {
  // global states
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  //console.log("THIS IS COURSE", course);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // HANDLE DELELTE SECTION
  async function handleDeleteSection(sectionId) {
    setLoading(true);
    const result = await deleteSection(token, {
      sectionId,
      courseId: course._id,
    });
    if (result) {
      dispatch(courseActions.setCourse(result));
    }
    setLoading(false);
    toast.success("Deleted section");
  }
  // HANDLE DELETE SUBSECTION
  async function handleDeleteSubSection(subSectionID, sectionId) {
    setLoading(true);

    const result = await deleteSubSection(token, { subSectionID, sectionId });
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(courseActions.setCourse(updatedCourse));
    }
    toast.success("Lecture deleted");
    setLoading(false);
  }

  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                {/* Edit SECTION NAME BUTTON */}
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName,
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300 transition-all duration-300 hover:text-caribbeangreen-600" />
                </button>
                {/* Delete SECTION BUTTON */}
                <DeleteModal
                  heading="Delete this section ?"
                  para="All the lectures in this section will be deleted"
                  loading={loading}
                  handler={() => {
                    handleDeleteSection(section._id);
                  }}
                />
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  onClick={() => {
                    setOpen(true);
                  }}
                  key={data?._id}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <CiVideoOn className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    {/* SubSection edit button */}
                    <ViewModal
                      viewData={{ ...data }}
                      open={open}
                      setOpen={setOpen}
                    />

                    <EditModal editData={{ ...data, sectionId: section._id }} />
                    {/* Delete subsection Button */}
                    <DeleteModal
                      heading="Delete this Sub-section ?"
                      para="This lecture will be deleted"
                      loading={loading}
                      handler={() => {
                        //console.log("This is section data.... ", data);
                        handleDeleteSubSection(data._id, section._id);
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <AddModal sectionId={section._id} />
            </div>
          </details>
        ))}
      </div>
    </>
  );
}

export default NestedView;
