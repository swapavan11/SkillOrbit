import HighlightText from "../homepage/HighlightText";

const Quote = () => {
  return (
    <div className=" mx-auto py-5 pb-20 text-center text-xl font-semibold text-white md:text-4xl">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighlightText>Combines Technology</HighlightText>,{" "}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text font-bold text-transparent">
        {" "}
        expertise
      </span>
      , and community to create an
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] bg-clip-text font-bold text-transparent">
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
