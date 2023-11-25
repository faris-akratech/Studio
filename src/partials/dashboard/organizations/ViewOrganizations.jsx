import React, { useEffect, useMemo, useState } from "react";
import OrgCard from "../../../components/OrgCard";
import { getAllOrganizations } from "../../../api/organizationsAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

export default function ViewOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useMemo(() => {
    const getData = async () => {
      const response = await getAllOrganizations();
      if (response.status === 200) {
        setOrganizations(response.data.data.organizations);
      } else setErr(response.response.data.error);
    };
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [organizations]);

  useEffect(() => {
    const filteredData = organizations.filter((org) =>
      org.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrganizations(filteredData);
  }, [search, organizations]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full mx-auto mb-3">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                type="text"
                id="search"
                placeholder="Search organizations.."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          {err ? (
            <>{err}</>
          ) : (
            <>
              {filteredOrganizations.length === 0 ? (
                <>
                  {organizations.length === 0 ? (
                    <div
                      onClick={() => navigate("/dashboard/new-organization")}
                      className="cursor-pointer"
                    >
                      <OrgCard
                        orgName={"There appears to be no organizations"}
                        orgImage={"https://www.colorhexa.com/ededed.png"}
                        orgRoles={"Add one to get started "}
                      />
                    </div>
                  ) : (
                    <>
                      {organizations.map((org) => {
                        return (
                          <div
                            className="mb-3 cursor-pointer"
                            key={org.id}
                            onClick={() =>
                              navigate(`/dashboard/organization/${org.id}`)
                            }
                          >
                            <OrgCard
                              orgName={org.name}
                              orgDescription={org.description}
                              orgImage={org.logoUrl}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <>
                  {filteredOrganizations.length === 0 ? (
                    <OrgCard
                      orgName={
                        "There appears to be no organizations for this search"
                      }
                      orgImage={"https://www.colorhexa.com/ededed.png"}
                      orgRoles={"Add one to get started"}
                    />
                  ) : (
                    <>
                      {filteredOrganizations.map((org) => {
                        return (
                          <div
                            className="mb-3 cursor-pointer"
                            key={org.id}
                            onClick={() =>
                              navigate(`/dashboard/organization/${org.id}`)
                            }
                          >
                            <OrgCard
                              orgName={org.name}
                              orgDescription={org.description}
                              orgImage={org.logoUrl}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}{" "}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
