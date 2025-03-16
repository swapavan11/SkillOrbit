import HighlightText from "./HighlightText";
import one from "../../../assets/Images/Know_your_progress.svg";
import two from "../../../assets/Images/Compare_with_others.svg";
import three from "../../../assets/Images/Plan_your_lessons.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function RotatedImages() {
  return (
    <div className="mx-auto mt-[2rem] w-[90%] space-y-8 lg:mt-[5.62rem] lg:w-9/12 ">
      {/* BODY */}
      <div className="mx-auto w-full space-y-5 text-center  lg:w-[60%]">
        <h1 className="text-4xl font-semibold">
          Your swiss knife for{" "}
          <HighlightText>learning any language</HighlightText>
        </h1>
        <p className="px-8 text-[1rem]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>
      {/* IMAGES */}
      <div className="flex flex-col items-center justify-center sm:flex-row  ">
        <div className="-mr-[7rem] ">
          <img src={one} alt="images for page" />
        </div>
        <div className="">
          <img src={two} alt="images for page" />
        </div>
        <div className="-ml-[8rem] ">
          <img src={three} alt="images for page" />
        </div>
      </div>
      {/* BUTTON */}
      <div className="text-center">
        <Link to="/signup">
          <Button variant="yellow" size="lg">
            Learn more
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RotatedImages;
