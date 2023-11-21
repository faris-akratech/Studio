import React, { useEffect, useMemo, useState } from "react";
import { getAllSchemas } from "../../../api/schemasAPI";
import OrgCard from "../../../components/OrgCard";
import { useNavigate } from "react-router-dom";
import SchemaCard from "../../../components/SchemaCard";

export default function ViewSchemas() {
  const [schemas, setSchemas] = useState([]);
  const [filteredSchemas, setFilteredSchemas] = useState([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useMemo(() => {
    const getData = async () => {
      const id = localStorage.getItem("orgIndex");
      const response = await getAllSchemas(id);
      if (response.status === 200) {
        setSchemas(response.data.data.schemasResult);
      } else setErr(response.response.data.error);
    };
    getData();
  }, []);

  useEffect(() => {
    const filteredData = schemas.filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSchemas(filteredData);
  }, [search, schemas]);

  return (
    <>
      <div className="w-full mx-auto mb-3">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
          <input
            className="peer h-full w-full outline-none text-sm text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
            type="text"
            id="search"
            placeholder="Search Schemas.."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-full">
        {err ? (
          <>{err}</>
        ) : (
          <>
            {filteredSchemas.length === 0 ? (
              <>
                {schemas.length === 0 ? (
                  <div
                    onClick={() => navigate("/dashboard/new-schema")}
                    className="cursor-pointer"
                  >
                    <OrgCard
                      orgName={"There appears to be no schemas"}
                      orgImage={"https://www.colorhexa.com/ededed.png"}
                      orgRoles={"Add one to get started "}
                    />
                  </div>
                ) : (
                  <>
                    {schemas.map((data) => {
                      return (
                        <div className="mb-3 cursor-pointer">
                          <SchemaCard
                            name={data.name}
                            version={data.version}
                            attribute={JSON.parse(data.attributes)}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                {filteredSchemas.length === 0 ? (
                  <OrgCard
                    orgName={"There appears to be no schemas for this search"}
                    orgImage={"https://www.colorhexa.com/ededed.png"}
                    orgRoles={"Add one to get started"}
                  />
                ) : (
                  <>
                    {filteredSchemas.map((data) => {
                      return (
                        <div className="mb-3">
                          <SchemaCard
                            name={data.name}
                            version={data.version}
                            attribute={JSON.parse(data.attributes)}
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
      </div>
    </>
  );
}