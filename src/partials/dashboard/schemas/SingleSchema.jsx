import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import { getSpecificSchema } from "../../../api/schemasAPI";
import SingleSchemaCard from "../../../components/SingleSchemaCard";

export default function SingleSchema() {
  const [details, setDetails] = useState("");
  const [err, setErr] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { schemaName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const orgId = localStorage.getItem("orgIndex");
      const response = await getSpecificSchema(schemaName, orgId);
      if (response.status === 200) setDetails(response.data.data);
      else setErr(response.response.data.error);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    if (details) {
      const trimmedAttributes = details.attributes.trim();
      const attributesArray = JSON.parse(trimmedAttributes);
      setAttributes(attributesArray);
    }
  }, [details]);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  return (
    <>
      {schemaName && (
        <>
          <div className="flex justify-between h-20 relative rounded-xl border-2 border-[#0F163A]">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 rounded-2xl"
              style={{
                backgroundImage: `url(https://t3.ftcdn.net/jpg/03/25/68/88/360_F_325688836_miB4OhosXN76nDCAMRK0vyinpmSI6C4i.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="flex w-96">
              <div
                className="h-full"
                onClick={() => navigate("/dashboard/view-schemas")}
              >
                <BackButton />
              </div>
              <div className="z-10 relative flex items-center text-2xl ml-20">
                {schemaName}
              </div>
            </div>
          </div>
          <div className="py-2">
            {attributes.map((x) => {
              return (
                <>
                  <SingleSchemaCard
                    name={x.attributeName}
                    type={x.schemaDataType}
                  />
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
