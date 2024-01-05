import React, { useEffect, useState } from "react";
import UserCard from "../../../components/UserCard";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api/userAPI";
import { getAllSchemas } from "../../../api/schemasAPI";
import organizationStore from "../../../store/organizationStore";

export default function Issuance() {
  const [err, setErr] = useState("");
  const [users, setUsers] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [user, setUser] = useState("");
  const [schema, setSchema] = useState("");
  const [attributes, setAttributes] = useState("");
  const [loading, setLoading] = useState(false);
  const [attributeValues, setAttributeValues] = useState({});

  const { selectedOrgIndex } = organizationStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();
    fetchAllSchemas();
  }, []);

  useEffect(() => {
    fetchAllSchemas();
  }, [selectedOrgIndex]);

  const fetchAllUsers = async () => {
    const response = await getAllUsers();
    if (response.status === 200) setUsers(response.data.data);
    else setErr(response?.response?.data?.error);
  };

  const fetchAllSchemas = async () => {
    if (selectedOrgIndex !== null) {
      const response = await getAllSchemas(selectedOrgIndex);
      if (response.status === 200) setSchemas(response.data.data.schemasResult);
      else setErr(response?.response?.data?.error);
    }
  };

  const handleSchemaChange = (e) => {
    const selectedSchemaName = e.target.value;
    const selectedSchema = schemas.find(
      (schema) => schema.name === selectedSchemaName
    );
    setSchema(selectedSchema);
    setAttributeValues({});
  };

  const renderAttributeInputs = () => {
    if (!schema || !schema.attributes) {
      return null;
    }

    const schemaAttributes = JSON.parse(schema.attributes);

    return schemaAttributes.map((attribute) => (
      <div key={attribute.attributeName} className="w-full mx-auto mb-5">
        <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
          <input
            className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
            type={attribute.schemaDataType === "number" ? "number" : "text"}
            id={attribute.attributeName}
            placeholder={`Enter ${attribute.displayName}`}
            required
            onChange={(e) =>
              handleAttributeChange(attribute.attributeName, e.target.value)
            }
          />
        </div>
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (!user || !schema) {
      setErr("Please select both a user and a schema.");
      return;
    }
    console.log(user, schema, attributeValues);
  };

  useEffect(()=>{
    setErr("")
  }, [user, schema])

  return (
    <>
      <div className="w-full mx-auto mb-3">
        <form className="" onSubmit={handleSubmit}>
          <div className="w-full flex ml-10 mt-20">
            <div className="flex flex-wrap w-5/6 px-5">
              <div className="w-full">
                <div className="w-full mx-auto mb-6">
                  <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                    <select
                      className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                      type="text"
                      id="name"
                      placeholder="User Name"
                      onChange={(e) => {
                        setUser(e.target.value);
                        setErr(null);
                      }}
                      required
                    >
                      <option value="placeholder">Select a user</option>
                      {users?.map((u) => (
                        <option value={u.id}>{`${u.firstName} ${u.lastName}`}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full mx-auto mb-6">
                  <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                    <select
                      className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                      onChange={handleSchemaChange}
                    >
                      <option value="placeholder">Select a schema</option>
                      {schemas?.map((u) => (
                        <option key={u.name} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {renderAttributeInputs()}

              <div className="w-full justify-center flex">
                <button
                  className={`block w-full h-20 bg-[#0F163A] mt-4 py-2 rounded-2xl border-2 border-white hover:text-[#0F163A] hover:bg-[#FF7F43] hover:border-2 hover:border-[#FF7F43] duration-200 ease-in-out text-white font-semibold mb-2 ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating new organization..." : "Create"}
                </button>
              </div>
              {err && <div className="text-red-500 text-2xl">Error: {err}</div>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
