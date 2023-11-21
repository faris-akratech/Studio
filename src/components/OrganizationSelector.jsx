import React, { useEffect, useMemo, useState } from "react";
import { getAllOrganizations } from "../api/organizationsAPI";

export default function OrganizationSelector() {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useMemo(() => {
    const getData = async () => {
      const response = await getAllOrganizations();
      if (response.status === 200) {
        setOptions(response.data.data.organizations);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const selectedOrganization = localStorage.getItem("org");
    if (selectedOrganization !== null) setSelected(selectedOrganization);
    else setSelected("Select an organizaiton");
  }, []);

  const changeOrganization = (org, index) => {
    setSelected(org);
    setIsOpen(false);
    localStorage.setItem("org", org);
    localStorage.setItem("orgIndex", index);
    window.location.reload(false)
  };

  return (
    <>
      <div
        className="block min-w-32 bg-white rounded-2xl py-2 px-4 border-2 border-[#FF7F43] text-[#0F163A] font-semibold text-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </div>
      {isOpen && (
        <>
          <div
            className={`bg-[#FF7F43] w-32 absolute z-30 py-2 px-3 text-center rounded-2xl ${
              options.length > 3 ? "h-48 overflow-y-scroll" : ""
            } `}
          >
            {options.map((org) => {
              return (
                <div
                  className="hover:bg-white rounded-2xl py-2 px-3"
                  onClick={() => changeOrganization(org.name, org.id)}
                >
                  {org.name}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
