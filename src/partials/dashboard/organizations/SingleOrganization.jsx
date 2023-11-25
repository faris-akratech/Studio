import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificOrganization } from "../../../api/organizationsAPI";
import Loader from "../../../components/Loader";
import Card from "../../../components/Card";
import BackButton from "../../../components/BackButton";
import { getAllSchemas } from "../../../api/schemasAPI";

export default function SingleOrganization() {
  const [details, setDetails] = useState();
  // const [schemas, setSchemas] = useState([]);
  const [schemaCount, setSchemaCount] = useState(0);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const { orgId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getSpecificOrganization(orgId);
      if (response.status === 200) {
        await getSchemas(orgId);
        setDetails(response.data.data);
      } else setErr(response.response.data.error);
    };
    const getSchemas = async () => {
      const response = await getAllSchemas(orgId);
      if (response.status === 200) {
        setSchemaCount(response.data.data.schemasCount);
      } else setErr(response.response.data.error);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [details]);

  const handleSchemaClick = (e) => {
    e.preventDefault();
    localStorage.setItem("org", details.name);
    localStorage.setItem("orgIndex", orgId);
    navigate("/dashboard/view-schemas");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {err && <div>{err}</div>}
          {details && (
            <>
              <div className="flex justify-between h-20 relative rounded-xl border-2 border-[#0F163A]">
                <div
                  className="absolute top-0 right-0 bottom-0 left-0"
                  style={{
                    backgroundImage: `url(${details.logoUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2,
                  }}
                ></div>
                <div className="flex w-96">
                  <div
                    className="h-full"
                    onClick={() => navigate("/dashboard/view-organizations")}
                  >
                    <BackButton />
                  </div>
                  <div className="z-10 relative flex items-center text-2xl ml-20">
                    {details.name}
                  </div>
                </div>

                <div className="z-10 relative flex items-center mr-20">
                  <a href={`https://${details.website}`}> {details.website}</a>
                </div>
              </div>
              <div
                className="mt-5 grid md:grid-cols-2 gap-5"
                onClick={handleSchemaClick}
              >
                <Card
                  content="Schemas"
                  color="bg-blue-500"
                  count={schemaCount}
                />
                <Card
                  content="Users"
                  color="bg-red-500"
                  count={3}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
