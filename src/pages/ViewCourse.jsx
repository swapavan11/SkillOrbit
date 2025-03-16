import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { viewCourseActions } from "../slices/viewCourseSlice";
import { Outlet } from "react-router-dom";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
function ViewCourse() {
  const { courseId, sectionId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(token, courseId);
      dispatch(
        viewCourseActions.setCourseSectionData(
          courseData.courseDetails.courseContent,
        ),
      );
      dispatch(viewCourseActions.setEntireCourseData(courseData.courseDetails));
      dispatch(
        viewCourseActions.setCompletedLectures(courseData.completedVideos),
      );

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((section) => {
        lectures += section.subSection.length;
      });
      dispatch(viewCourseActions.setTotalNoOfLectures(lectures));
    })();
  }, [courseId, sectionId]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCourse;
