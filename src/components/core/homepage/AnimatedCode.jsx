import { TypeAnimation } from "react-type-animation";
function AnimatedCode({ color, bgColor }) {
  let shadow = ` shadow-[0px_0px_200px_90px_${bgColor}] `;
  return (
    <div className="relative z-10 order-2 flex w-full select-none flex-row gap-3 rounded-lg  border-2 border-richblack-600 bg-richblack-900/95 px-4 py-2 text-richblack-200 xl:w-1/2">
      <div className="flex flex-col items-center justify-center font-bold">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
      </div>
      <div className="overflow-hidden">
        <TypeAnimation
          style={{
            whiteSpace: "pre-line",
            fontSize: "16px",
            display: "block",
            color: `${color}`,
            fontFamily: "Roboto Mono, monospace",
          }}
          sequence={[
            `<!DOCTYPE html>
          <html>
          <head><title>Example</title>
          <linkrel="stylesheet"href="styles.css">
          </head>
          <body>
          <h1><ahref="/">Header</a>
          </h1>
          <nav><ahref="one/">One</a><ahref="two/">Two
          </a><ahref="three/">Three</a>
          </nav>`,
            1000,
            "",
          ]}
          omitDeletionAnimation={true}
          speed={75}
          repeat={Infinity}
        />
      </div>
      <div
        className={`absolute left-1/4 top-1/2  -z-10 h-[1px] w-[1px] rounded-full ${bgColor === "blue" ? "shadow-[0px_0px_200px_90px_#118ab2]" : "shadow-[0px_0px_200px_90px_#e7be09af]"} `}
      ></div>
    </div>
  );
}

export default AnimatedCode;
