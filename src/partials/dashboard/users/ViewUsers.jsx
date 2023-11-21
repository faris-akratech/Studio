import React from "react";
import UserCard from "../../../components/UserCard";
import Footer from "../../../components/Footer";

export default function ViewUsers() {
  return (
    <>
      <div className="w-full mx-auto mb-3">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
          <input
            className="peer h-full w-full outline-none text-sm text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
            type="text"
            id="search"
            placeholder="Search users.."
          />
        </div>
      </div>
      <div className="mb-3">
        <UserCard username={"Test"} email={"test@test.com"} />
      </div>
      <div className="mb-3">
        <UserCard username={"Test"} email={"test@test.com"} />
      </div>
      <div className="mb-3">
        <UserCard username={"Test"} email={"test@test.com"} />
      </div>
      <div className="mb-3">
        <UserCard username={"Test"} email={"test@test.com"} />
      </div>
      <div className="mb-3">
        <UserCard username={"Test"} email={"test@test.com"} />
      </div>
      {/* <div className="absolute bottom-0 w-full -ml-5">
        <Footer/>
      </div> */}
    </>
  );
}
