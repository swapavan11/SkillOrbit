import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCatalogPageData } from "../services/operations/catalogPageDataAPI";
import Error from "./Error";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
function Catalog() {
  const { categoryId } = useParams();

  // Global states
  const { loading } = useSelector((state) => state.profile);

  // Local states
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);

  // Load the data
  useEffect(() => {
    async function getCategoryDetails() {
      try {
        const result = await getCatalogPageData(categoryId);
        setCatalogPageData(result);
      } catch (error) {
        //console.log(error);
      }
    }
    getCategoryDetails();
  }, [categoryId]);

  // handle loading and error state
  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <PropagateLoader color="#afb2bf" />
      </div>
    );
  }
  if (!loading && !catalogPageData.success) {
    return <Error />;
  }
  return (
    <div>
      {/* Hero Section */}
      <div className=" box-border bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] w-full  flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-border w-full  px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="overflow-y-hidden">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-border w-full  px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="overflow-hidden py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto  w-full px-4  py-12 lg:max-w-maxContent ">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard
                  course={course}
                  key={i}
                  Height={"lg:h-[400px] h-[300px]"}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
