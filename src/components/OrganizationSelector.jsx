import React, { useEffect, useMemo, useState } from "react";
import { getAllOrganizations } from "../api/organizationsAPI";
// import { useLocation } from "react-router-dom";
import organizationStore from "../store/organizationStore";

export default function OrganizationSelector() {
  // const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);

  // const location = useLocation();
  const { selectedOrganization, setSelectedOrganization, setSelectedOrgIndex } =
    organizationStore();

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
    localStorage.setItem("orgCount", options.length);
  }, [options]);

  useEffect(() => {
    const selectedOrganization = localStorage.getItem("org");
    const selectedIndex = localStorage.getItem("orgIndex");
    if (selectedOrganization !== null) {
      setSelectedOrganization(selectedOrganization);
      setSelectedOrgIndex(selectedIndex);
    } else setSelectedOrganization("Select an organizaiton");
  }, []);

  const changeOrganization = (org, index) => {
    setSelectedOrganization(org);
    setSelectedOrgIndex(index);
    setIsOpen(false);
    localStorage.setItem("org", org);
    localStorage.setItem("orgIndex", index);
    // if (location.pathname === "/dashboard/view-schemas")
    //   window.location.reload(false);
  };

  return (
    <>
      <div
        className="block min-w-32 bg-white rounded-2xl py-2 px-4 border-2 border-[#FF7F43] text-[#0F163A] font-semibold text-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOrganization}
      </div>
      {isOpen && (
        <>
          {options.length !== 0 ? (
            <div
              className={`bg-[#FF7F43] w-32 absolute z-30 py-2 px-3 text-center rounded-2xl ${
                options.length > 3 ? "h-48 overflow-y-scroll" : ""
              } `}
            >
              {options.map((org) => {
                return (
                  <div
                    className="hover:bg-white rounded-2xl py-2 px-3 cursor-pointer"
                    onClick={() => changeOrganization(org.name, org.id)}
                  >
                    {org.name}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#FF7F43] w-52 absolute z-30 py-3 px-3 text-center rounded-2xl cursor-default">
              No organizations
            </div>
          )}
        </>
      )}
    </>
  );
}
