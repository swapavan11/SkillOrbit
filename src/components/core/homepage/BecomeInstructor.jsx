import image from "../../../assets/Images/Instructor.png";
import { Button } from "@/components/ui/button";
import HighlightText from "./HighlightText";
import { Link } from "react-router-dom";
function BecomeInstructor() {
  return (
    <div className="mx-auto mt-[2rem] flex w-[90%] flex-col items-center justify-center gap-[6rem] lg:mt-[5.62rem] lg:w-9/12 lg:flex-row">
      {/* Image */}
      <div className="mx-auto w-full shadow-[-5px_-5px_0px_0px_#F5F5F5] sm:w-8/12 md:w-1/2">
        <img src={image} alt="image" className="w-full" />
      </div>
      {/* Body */}
      <div className="w-full space-y-12 lg:w-[40%] ">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            Become an <br /> <HighlightText>instructor</HighlightText>
          </h1>
          <p className="text-richblack-400">
            Instructors from around the world teach millions of students on
            SkillOrbit. We provide the tools and skills to teach what you love.
          </p>
        </div>
        <Link to="/login" className="inline-block">
          <Button variant="yellow">Start Teaching Today</Button>
        </Link>
      </div>
    </div>
  );
}

export default BecomeInstructor;
