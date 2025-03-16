import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";
import { COURSE_STATUS } from "../../../../utils/constants";
import DeleteModal from "./DeleteModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";
export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const TRUNCATE_LENGTH = 30;

  // global states
  const { token } = useSelector((state) => state.auth);

  async function handleDelete(courseId) {
    setLoading(true);
    await deleteCourse(token, courseId);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setLoading(false);
  }

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="mt-6 flex gap-x-10 border-b border-richblack-800 px-6 py-8 sm:mt-0"
              >
                <Td className="flex flex-1 flex-col gap-4 sm:flex-row  sm:gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between gap-2 sm:gap-0">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>

                <Td className="mt-4 text-sm font-medium text-richblack-100 sm:mt-0">
                  ₹{course.price}
                </Td>
                <Td className="mt-4 text-sm font-medium text-richblack-100 sm:mt-0 ">
                  {/* EDIT AND DELETE BUTTONS */}
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <DeleteModal
                    courseId={course._id}
                    loading={loading}
                    handleDelete={handleDelete}
                  />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
}
