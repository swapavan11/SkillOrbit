import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HighlightText from "./HighlightText";
import ExploreCard from "./ExploreCard";
import { HomePageExplore } from "../../../data/homepage-explore";
const allTabs = [
  "Free",
  "New to Coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
function TabSection() {
  return (
    <div className="relative mx-auto w-[90%] pb-[5rem] text-center lg:w-9/12 lg:pb-[10rem]">
      {/* HEADINGS */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold ">
          Unlock the <HighlightText>Power of Code</HighlightText>{" "}
        </h1>
        <p className="text-richblack-400">
          Learn to build anything you can imagine
        </p>
      </div>
      {/* TABS */}
      <Tabs defaultValue={allTabs[0]} className="mt-8 w-full">
        <TabsList className="mb-8 rounded-full bg-richblack-800 p-3 text-[1rem]">
          {allTabs.map((element, index) => {
            return (
              <TabsTrigger
                className={`mx-1 rounded-full hover:bg-richblack-900 hover:text-white data-[state=active]:bg-richblack-900 data-[state=active]:text-richblack-5 ${index > 2 ? "hidden md:block" : ""}`}
                key={index}
                value={element}
              >
                <p>{element}</p>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {allTabs.map((element, index) => {
          return (
            <TabsContent key={index} value={element}>
              <div className="flex flex-col gap-10 lg:absolute lg:flex-row ">
                {HomePageExplore[index].courses.map((data, index) => {
                  return (
                    <ExploreCard
                      key={index}
                      heading={data.heading}
                      description={data.description}
                      who={data.level}
                      num={data.lessionNumber}
                    />
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

export default TabSection;
