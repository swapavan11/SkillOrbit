function ExploreCard({ heading, description, who, num }) {
  return (
    <div className="cursor-pointer space-y-8 bg-richblack-800 px-4 py-6 text-left text-richblack-25 transition-all duration-500 hover:bg-richblack-5 hover:text-richblack-800 hover:shadow-[10px_10px_0px_0px_#FFD60A]">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold ">{heading}</h1>
        <p className="text-[1rem] text-richblack-400">{description}</p>
      </div>
      <div className="flex flex-row justify-between border-t-2 border-dashed border-richblack-400 pt-3 text-[1rem] text-richblack-400">
        <p>{who}</p>
        <p>{num}</p>
      </div>
    </div>
  );
}

export default ExploreCard;
