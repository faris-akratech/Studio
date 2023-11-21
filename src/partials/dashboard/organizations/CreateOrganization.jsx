import React, { useState } from "react";
import imageLoading from "/images/imageLoading.png";
import Button from "../../../components/Button";
import { createNewOrganization } from "../../../api/organizationsAPI";
import { useNavigate } from "react-router-dom";

export default function CreateOrganization() {
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [site, setSite] = useState("");
  const [logo, setLogo] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description: desc,
      website: site,
      logo,
    };
    const response = await createNewOrganization(data);
    if (response.status === 200) {
      setName("");
      setDesc("");
      setSite("");
      setLogo("");
      navigate("/dashboard/view-organizations");
    } else setErr(response?.response?.data?.error);
  };

  const handleLogoChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErr("Invalid file type. Please choose an image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        setErr(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="w-full flex ml-10 mt-20">
          <div className="flex flex-wrap w-5/6 px-5">
            <div className="w-full md:w-1/2 flex justify-center items-center mx-auto mb-3 border-2 border-[#0F163A] h-72">
              <img
                src={logo ? logo : imageLoading}
                alt={"Preview"}
                className="w-64 h-64 aspect-square"
              />
            </div>

            <div className="w-1/2 pl-5">
              <div className="w-full mx-auto mb-6">
                <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                  <input
                    className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                    type="text"
                    id="name"
                    placeholder="Organization Name"
                    onChange={(e) => {
                      setName(e.target.value);
                      setErr(null);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="w-full mx-auto mb-6">
                <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                  <input
                    className="peer h-full w-full outline-none text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A] text-xl"
                    type="text"
                    id="website"
                    placeholder="Organization Website"
                    onChange={(e) => {
                      setSite(e.target.value);
                      setErr(null);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="w-full mx-auto mb-5">
                <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                  <input
                    className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A] mt-10"
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full mx-auto mb-5">
              <div className="relative flex items-center w-full h-20 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
                <input
                  className="peer h-full w-full outline-none text-xl text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                  type="text"
                  id="description"
                  placeholder="Organization Description"
                  required
                  onChange={(e) => {
                    setDesc(e.target.value);
                    setErr(null);
                  }}
                />
              </div>
            </div>

            <div className="w-full justify-center flex">
              <button
                className="block w-full h-20 bg-[#0F163A] mt-4 py-2 rounded-2xl border-2 border-white hover:text-[#0F163A] hover:bg-[#FF7F43] hover:border-2 hover:border-[#FF7F43] duration-200 ease-in-out text-white font-semibold mb-2"
                type="submit"
              >
                Submit
              </button>
            </div>
            {err && <div className="text-red-500 text-2xl">Error: {err}</div>}
          </div>
        </div>
      </form>
    </>
  );
}
