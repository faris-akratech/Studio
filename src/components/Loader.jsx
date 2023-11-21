import React from "react";

export default function Loader() {
  return (
    <div class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
      <div class="border-t-transparent border-solid animate-spin  rounded-full border-[#0F163A] border-8 h-64 w-64"></div>
    </div>
  );
}
