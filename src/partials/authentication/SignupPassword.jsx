import React, { useState } from "react";
import { encrypt, passwordValidation } from "../../services/validations";
import createAxiosInstance from "../../services/axiosInterceptor";
import { AUTH_SERVER } from "../../services/constants";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const axiosInstance = createAxiosInstance(AUTH_SERVER);

export default function SignupPassword() {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (pass === confirmPass) {
      if (passwordValidation(pass)) {
        const mail = localStorage.getItem("Email");
        const data = {
          firstName,
          lastName,
          password: pass,
          email: mail,
        };
        await axiosInstance
          .post("/signup", data)
          .then((response) => {
            if (response.status === 200) {
              localStorage.removeItem("Email");
              localStorage.removeItem("isAllowed");
              setLoading(false)
              navigate("/login");
            }
          })
          .catch((err) => {
            setErr(err.response.data.error);
            console.error(err);
            setLoading(false)
          });
      } else {
        setErr(
          "Password must be 8 charecters long, should include upper and lower case and must contain a number and a special charecter"
        );
        setLoading(false);
      }
    } else {
      setErr("Passwords do not match");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="h-screen md:flex">
        <div className="md:w-3/5 w-full bg-[#EDEDED] bg-opacity-40 lg:p-4 md:p-4">
          <div className="flex justify-center mt-40">
            <img
              className="hidden sm:block"
              src="/images/signin.svg"
              alt="img"
            />
          </div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-10">
              Please enter your password
            </h1>
            {err && <div className="text-[#FF7F43] mt-5 mb-5 w-40">{err}</div>}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B6B70]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="First Name"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErr(null);
                }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B6B70]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Last Name"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErr(null);
                }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B6B70]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name=""
                id=""
                placeholder="Password"
                required
                onChange={(e) => {
                  setPass(e.target.value);
                  setErr(null);
                }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B6B70]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name=""
                id=""
                placeholder="Confirm Password"
                required
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setErr(null);
                }}
              />
            </div>
            <button type="submit" className="h-full w-full">
              <Button text="Confirm" primary={true} disabled={loading}/>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
