import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HighlightText from "../components/core/homepage/HighlightText";
import banner from "../assets/Images/banner.mp4";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AnimatedCode from "../components/core/homepage/AnimatedCode";
import Timeline from "../components/core/homepage/Timeline";
import RotatedImages from "../components/core/homepage/RotatedImages";
import BecomeInstructor from "../components/core/homepage/BecomeInstructor";
import TabSection from "../components/core/homepage/TabSection";
import ReviewSlider from "../components/common/ReviewSlider";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-richblack-900 pt-10 font-inter">
      {/* SECTION - 1 */}
      <section className="w-full bg-richblack-900 text-richblack-5">
        {/* PART ONE */}
        <div className="mx-auto mb-14 w-[90%] space-y-[2rem] pt-5 text-center sm:w-[80%] md:w-[70%]">
          <Link to="/signup">
            <button className="mx-auto flex flex-row items-center gap-1 rounded-full border-2 border-richblack-800 bg-richblack-800 px-[1.1rem] py-[.4rem] text-lg text-richblack-200 transition-all duration-200 hover:bg-transparent">
              <div>Become an instructor</div>
              <div className="text-sm">
                <ArrowRight />
              </div>
            </button>
          </Link>
          <div className="space-y-[1rem]">
            <h1 className="text-4xl font-semibold">
              Empower Your Future with{" "}
              <HighlightText>Coding Skills</HighlightText>
            </h1>
            <p className="text-lg text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.{" "}
            </p>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="yellow" size="lg">
                <div className="hidden md:block">Learn more</div>
                <div className="block md:hidden">Login</div>
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="normal" size="lg">
                <div className="hidden md:block">Book a demo</div>
                <div className="block md:hidden">Sign Up</div>
              </Button>
            </Link>
          </div>
        </div>
        {/* PART TWO ->  VIDEO SECTION */}
        <div className="mx-auto w-[90%] shadow-[0px_-10px_70px_0px_#118ab2a8] sm:w-[80%] lg:w-[60%]">
          <AspectRatio
            ratio={16 / 9}
            className=" w-full shadow-[20px_20px_0px_0px_#F5F5F5] "
          >
            <video src={banner} loop autoPlay></video>
          </AspectRatio>
        </div>

        {/* PART THREE -> ANIMATED CODING BLOCKS */}
        <div className="mx-auto flex w-[90%] flex-col gap-[6.125rem]  px-2 pb-[3rem] pt-[6rem]  sm:w-[70%] sm:px-10  xl:flex-row xl:px-0 xl:pb-[6rem]">
          {/* Card */}
          <div className="order-1 flex flex-col justify-between gap-10 lg:w-1/2">
            {/* body */}
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold">
                Unlock your <HighlightText>coding potential</HighlightText> with
                our online courses.
              </h1>
              <p className=" text-richblack-300">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </p>
            </div>
            {/* Actions */}
            <div className="space-x-5">
              <Link to="/login">
                <Button variant="yellow">Try it Yourself</Button>
              </Link>
              <Link to="/signup">
                <Button variant="normal">Learn More</Button>
              </Link>
            </div>
          </div>
          <AnimatedCode color="#FFD60A" />
        </div>

        {/* PART FOUR -> ANIMATED CODING BLOCK */}
        <div className="mx-auto flex w-[90%] flex-col  gap-[6.125rem]  px-2 pb-[6rem] pt-[2rem] sm:w-[70%] sm:px-10  xl:flex-row xl:px-0  xl:pt-[6rem]">
          <AnimatedCode color="#118ab2" bgColor="blue" />
          {/* Card */}
          <div className="order-1 flex w-full flex-col gap-10 xl:order-3  xl:w-1/2">
            {/* body */}
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold">
                Start{" "}
                <HighlightText>
                  coding
                  <br /> in seconds
                </HighlightText>
              </h1>
              <p className=" text-richblack-300">
                Go ahead, give it a try. Our hands-on learning environment means
                you&apos;ll be writing real code from your very first lesson.
              </p>
            </div>
            {/* Actions */}
            <div className="space-x-5">
              <Link to="/login">
                <Button variant="yellow">Continue Lesson</Button>
              </Link>
              <Link to="/signup">
                <Button variant="normal">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <TabSection />
      </section>

      {/* SECTION - 2 */}
      <section className=" w-full bg-pure-greys-5 pb-[5rem] text-richblack-700 ">
        {/* BG - IMAGE SECTION */}
        <div className="crossImage flex h-[10rem] w-full items-center justify-center bg-[url('../src/assets/Images/bghome.svg')] lg:h-[20rem]">
          <div className="space-x-8 lg:translate-y-10">
            <Link to="/catalog/65a9676b7b8cdef25ea5067b">
              <Button variant="yellow">Explore Full Catalog </Button>
            </Link>
            <Link to="/login">
              <Button variant="normal">Learn more</Button>
            </Link>
          </div>
        </div>
        {/* JOB IN DEMAND SECTION */}
        <div className="mx-auto mt-[2rem] flex w-[90%] justify-between text-[1rem]  lg:mt-[5.62rem]  lg:w-9/12">
          <div className="w-[45%]">
            <h1 className="text-4xl font-semibold">
              Get the skills you need for a{" "}
              <HighlightText>job that is in demand.</HighlightText>
            </h1>
          </div>
          <div className="w-[50%] space-y-6 lg:space-y-12">
            <p>
              The modern SkillOrbit dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <Link className="inline-block" to="/login">
              <Button variant="yellow">Learn more</Button>
            </Link>
          </div>
        </div>
        {/* TimeLine Section */}
        <Timeline />
        {/* Rotated Images Section */}
        <RotatedImages />
      </section>

      {/* SECTION - 3 */}
      <section className="w-full bg-richblack-900  text-richblack-5">
        {/* Become Instructor */}
        <BecomeInstructor />
        {/* REVIEWS  */}
        <h1 className="mt-12 text-center text-2xl  font-semibold lg:text-4xl">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </section>
    </div>
  );
}

export default Home;
