import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewSchema } from "../../../api/schemasAPI";

export default function CreateSchema() {
  const [err, setErr] = useState("");
  const [version, setVersion] = useState("");
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([
    { attributeName: "", schemaDataType: "", displayName: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [missingAttributeIndex, setMissingAttributeIndex] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyAttribute = attributes.find(
      (attribute) =>
        attribute.attributeName.trim() === "" || attribute.schemaDataType === ""
    );

    if (emptyAttribute) {
      const missingField =
        emptyAttribute.attributeName.trim() === ""
          ? "Attribute Name"
          : "Schema Data Type";
      setErr(
        `Please provide a value for ${missingField} in all attributes before submitting.`
      );
      setMissingAttributeIndex(attributes.indexOf(emptyAttribute));
      setLoading(false);
      return;
    }

    // setLoading(true);
    const id = localStorage.getItem("orgIndex");
    const data = { schemaVersion: version, schemaName: name, attributes };

    console.log(data);
    // const response = await createNewSchema(data, id);
    // if (response.status === 200) navigate("/dashboard/view-schemas");
    // else {
    //   setErr(response?.response?.data?.error);
    //   setLoading(false);
    // }
  };

  const handleAttributeChange = (index, field, value) => {
    setMissingAttributeIndex(null);
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
    setErr(null);
  };

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      { attributeName: "", schemaDataType: "", displayName: "" },
    ]);
  };

  const removeAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  return (
    <>
      <form className="w-full ml-10" onSubmit={handleSubmit}>
        <div className="w-full flex mt-20">
          <div className="flex flex-wrap w-full px-5">
            <div className="w-11/12 flex">
              <div className="w-1/2 mb-6 mr-3">
                <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                  <input
                    className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                    type="text"
                    id="name"
                    placeholder="Schema version"
                    value={version}
                    onChange={(e) => {
                      setVersion(e.target.value);
                      setErr(null);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="relative flex items-center w-1/2 h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden mb-5 ml-3">
                <input
                  className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                  type="text"
                  id="website"
                  placeholder="Schema name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErr(null);
                  }}
                  required
                />
              </div>
            </div>

            <div className="w-full mb-5">
              {attributes.map((attribute, index) => (
                <>
                  <div key={index} className="flex mb-5 w-11/12">
                    <div className="relative flex items-center w-1/2 h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden mr-6">
                      <input
                        className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                        type="text"
                        placeholder="Attribute Name"
                        value={attribute.attributeName}
                        onChange={(e) =>
                          handleAttributeChange(
                            index,
                            "attributeName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="relative flex items-center w-1/3 h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden mr-6">
                      <select
                        className={`peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A] bg-white ${
                          missingAttributeIndex === index && "border-red-500"
                        }`}
                        placeholder="Schema Data Type"
                        value={attribute.schemaDataType}
                        onChange={(e) =>
                          handleAttributeChange(
                            index,
                            "schemaDataType",
                            e.target.value
                          )
                        }
                        required
                        name="Data_type"
                      >
                        <option value="option">Select a datatype</option>
                        <option value="string">string</option>
                        <option value="number">number</option>
                      </select>
                    </div>
                    <div className="relative flex items-center w-1/2 h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                      <input
                        className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                        type="text"
                        placeholder="Display Name"
                        value={attribute.displayName}
                        onChange={(e) =>
                          handleAttributeChange(
                            index,
                            "displayName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                  {index === attributes.length - 1 && (
                    <div
                      className={`w-11/12 flex items-center ${
                        attributes.length > 1
                          ? "justify-around"
                          : "justify-center"
                      }`}
                    >
                      <button
                        className="bg-gray-200 hover:bg-gray-300 duration-300 ease-in-out p-3 rounded-md"
                        onClick={addAttribute}
                      >
                        + Add new attribute
                      </button>
                      {attributes.length > 1 && (
                        <button
                          className="bg-gray-200 hover:bg-gray-300 duration-300 ease-in-out p-3 rounded-md"
                          onClick={() => removeAttribute(index)}
                        >
                          - Remove
                        </button>
                      )}
                    </div>
                  )}
                </>
              ))}
            </div>

            <div className="w-11/12 justify-center flex">
              <button
                className={`block w-full h-20 bg-[#0F163A] mt-4 py-2 rounded-2xl border-2 border-white hover:text-[#0F163A] hover:bg-[#FF7F43] hover:border-2 hover:border-[#FF7F43] duration-200 ease-in-out text-white font-semibold mb-2 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating new schema..." : "Create"}
              </button>
            </div>
            {err && <div className="text-red-500 text-2xl">Error: {err}</div>}
          </div>
        </div>
      </form>
    </>
  );
}
