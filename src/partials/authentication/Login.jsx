import React, { useState } from "react";
import createAxiosInstance from "../../services/axiosInterceptor";
import { AUTH_SERVER } from "../../services/constants";
import { useNavigate } from "react-router-dom";
import { emailValidation, encrypt } from "../../services/validations";
import Button from "../../components/Button";

const axiosInstance = createAxiosInstance(AUTH_SERVER);

export default function Login() {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValidation(email)) {
      setErr("Invalid email format");
      return;
    }

    const data = { email, password };
    try {
      const response = await axiosInstance.post("/signin", data);

      if (response.status === 200) {
        const { iv, encryptedValue } = encrypt(response.data.access_token);
        localStorage.setItem("access", encryptedValue);
        localStorage.setItem("value", iv);
        navigate("/dashboard");
        window.location.reload(false);
      }
    } catch (err) {
      console.error(err);
      setErr(err.response.data.error);
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
            <h1 className="text-gray-800 font-bold text-2xl mb-10">Welcome</h1>
            {err && <div className="text-[#FF7F43] mt-5 mb-5">{err}</div>}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B6B70]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="email"
                name=""
                id=""
                placeholder="Email Address"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr(null);
                }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B6B70]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
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
                  setPassword(e.target.value);
                  setErr(null);
                }}
              />
            </div>
            <button className="w-full h-full" type="submit">
              <Button text="Login" primary={true} />
            </button>
            <span
              className="text-sm ml-2 hover:text-[#0F163A] hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
