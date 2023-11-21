import React from "react";

export default function Card({ content, color, count }) {
  return (
    // <div className={style}>
    //     {content}
    // </div>
    <div className={`flex-shrink-0 relative overflow-hidden rounded-lg w-full shadow-lg ${color}`}>
      <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: 0.1 }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
            opacity: 0.2,
          }}
        ></div>
        <div className="relative text-white px-6 pb-6 mt-6">
          <div className="flex justify-center">
            <span className="block font-semibold text-6xl">{count}</span>
          </div>
        </div>
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
        <div className="flex justify-center">
          <span className="block font-semibold text-xl">{content}</span>
        </div>
      </div>
    </div>
  );
}
