import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

export default function Overview() {
  const [orgCount, setOrgCount] = useState(0)
  
  const navigate = useNavigate();

  useEffect(()=> {
    const count = localStorage.getItem('orgCount')
    if(count) setOrgCount(Number(count))
  }, [])

  return (
    <>
      <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow">
        <Card content="Users" color="bg-[#7FCFEC]" count={0} />
      </div>
      <div
        className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow"
        onClick={() => navigate("/dashboard/view-organizations")}
      >
        <Card content="Organizations" color="bg-[#14D8CC]" count={orgCount} />
      </div>
      <div
        className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow"
        onClick={() => navigate("/dashboard/view-schemas")}
      >
        <Card content="Schemas" color="bg-[#550ABC]" count={0} />
      </div>
      {/* <div className="absolute bottom-0 w-full -ml-5">
        <Footer/>
      </div> */}
    </>
  );
}
