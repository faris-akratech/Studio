import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

export default function Overview() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow">
        <Card content="Users" color={"bg-[#7FCFEC]"} count={3} />
      </div>
      <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow">
        <Card content="Organizations" color={"bg-[#14D8CC]"} count={3} />
      </div>
      <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow">
        <Card content="Schemas" color={"bg-[#550ABC]"} count={3} />
      </div>
      {/* <div className="absolute bottom-0 w-full -ml-5">
        <Footer/>
      </div> */}
    </>
  );
}
