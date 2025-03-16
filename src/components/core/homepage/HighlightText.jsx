import React from "react";

function HighlightText({ children }) {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
      {children}
    </span>
  );
}

export default HighlightText;
