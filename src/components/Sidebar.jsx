import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const options = [
  {
    heading: "Dashboard",
    sections: [{ title: "Overview", url: "/dashboard/overview" }],
  },
  {
    heading: "Users",
    sections: [
      { title: "View users", url: "/dashboard/view-users" },
      { title: "Invitations", url: "/dashboard/view-invites" },
    ],
  },
  {
    heading: "Organizations",
    sections: [
      { title: "View organizations", url: "/dashboard/view-organizations" },
      { title: "Create organization", url: "/dashboard/new-organization" },
    ],
  },
  {
    heading: "Schemas",
    sections: [
      { title: "View all schemas", url: "/dashboard/view-schemas" },
      { title: "Create new schema", url: "/dashboard/new-schema" },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-7">
        <img src="/images/logo.png" alt="Nashid" className="w-28" />
      </div>
      <aside className="w-full p-6 sm:w-60 bg-[#0F163A] text-gray-100">
        <nav className="space-y-8 text-sm">
          {options.map((item, index) => {
            return (
              <>
                <div className="space-y-2" key={index}>
                  <h2 className="text-xl font-semibold tracki uppercase  text-[#FF7F43]">
                    {item.heading}
                  </h2>
                  <div className="flex flex-col space-y-1 cursor-pointer text-xl">
                    {item.sections.map((subHeading, subIndex) => {
                      return (
                        <>
                          <a
                            rel="noopener noreferrer"
                            key={subIndex}
                            onClick={() =>
                              subHeading.url && navigate(subHeading.url)
                            }
                            className={
                              location.pathname === subHeading.url
                                ? "text-white font-bold"
                                : "text-gray-300"
                            }
                          >
                            {subHeading.title}
                          </a>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
