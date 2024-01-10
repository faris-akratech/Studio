import React from "react";

export default function Button({ text, primary, disabled }) {
  return (
    <button
      className={
        primary
          ? "block w-full bg-[#0F163A] mt-4 py-2 rounded-2xl border-2 border-white hover:text-[#0F163A] hover:bg-white hover:border-2 hover:border-[#0F163A] duration-200 ease-in-out text-white font-semibold mb-2"
          : "block w-32 bg-[#FF7F43] py-2 rounded-2xl border-2 border-[#FF7F43] hover:text-[#FF7F43] hover:bg-white hover:border-2 hover:border-[#FF7F43] duration-200 ease-in-out text-white font-semibold"
      }
      disabled={disabled}
    >
      {text}
    </button>
  );
}
