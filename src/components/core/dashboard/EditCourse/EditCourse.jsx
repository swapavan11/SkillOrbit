import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { courseActions } from "../../../../slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { PropagateLoader } from "react-spinners";
function EditCourse() {
  const dispatch = useDispatch();

  // global states
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  // fetching course id from the params
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  // Fetch course details
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(token, courseId);
      if (result?.courseDetails) {
        dispatch(courseActions.setEditCourse(true));
        dispatch(courseActions.setCourse(result?.courseDetails));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] flex-1 place-items-center">
        <PropagateLoader color="#afb2bf" />
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-12 lg:p-16">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
}

export default EditCourse;
