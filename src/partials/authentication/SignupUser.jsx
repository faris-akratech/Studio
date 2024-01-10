import React, { useState } from "react";
import createAxiosInstance from "../../services/axiosInterceptor";
import { AUTH_SERVER } from "../../services/constants";
import { emailValidation } from "../../services/validations";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const axiosInstance = createAxiosInstance(AUTH_SERVER);

export default function SignupUser() {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!emailValidation(email)) {
      setErr("Invalid email format");
      setLoading(false);
      return;
    }

    await axiosInstance
      .post("/verification-mail", { email })
      .then((response) => {
        if (response.status === 200) {
          setFlag(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setErr(err.response.data.error);
        console.error(err);
        setLoading(false);
      });
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
            <h1 className="text-gray-800 font-bold text-2xl mb-10">Join Us</h1>
            {err && <div className="text-[#FF7F43] mt-5 mb-5">{err}</div>}
            {flag && (
              <div className="text-[#0F163A] mt-5 mb-5 w-56">
                Verification mail has been sent to your mail
              </div>
            )}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6B6B70]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
            <button type="submit" className="h-full w-full">
              <Button text="Register" primary={true} disabled={loading} />
            </button>
            <span
              className="text-sm ml-2 hover:text-[#0F163A] hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Already a user? Login
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
