import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0F163A] border-b border-[#0F163A] sm:py-2 ">
      <div className="md:flex md:items-center md:justify-center p-3">
        <p className="text-sm text-center text-[#EDEDED]">
          &copy; 2023 - {new Date().getFullYear()} -
          <a className="hover:underline" target="_blank">
            Nashid
          </a>{" "}
          | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
