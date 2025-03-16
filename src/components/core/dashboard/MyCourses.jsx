import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

import CoursesTable from "./InstructorCourses/CoursesTable";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-4 md:p-12 lg:p-16">
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <Button
          variant="yellow"
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <p>Add Course</p>
          <VscAdd />
        </Button>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}
