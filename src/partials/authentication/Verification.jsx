import React, { useEffect, useState } from "react";
import createAxiosInstance from "../../services/axiosInterceptor";
import { AUTH_SERVER } from "../../services/constants";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const axiosInstance = createAxiosInstance(AUTH_SERVER);

export default function Verification() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("verificationCode");
      const email = urlParams.get("email");
      if (code && email) {
        localStorage.setItem("Email", email);
        setVerificationCode(code);
        setEmail(email);

        try {
          setLoading(true);
          const response = await axiosInstance.get("/verify", {
            params: { email, verificationCode },
          });

          if (response.status === 200) {
            setMsg("User verified successfully");
            localStorage.setItem("isAllowed", true);
          } else {
            setMsg("Failed to verify user");
          }
        } catch (error) {
          setMsg(error.response?.data?.error || "An error occurred");
        } finally {
          setLoading(false);
        }
      } else {
        setMsg("Verification code not found in the URL");
      }
    };

    verify();
  }, [verificationCode]);

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
        <div className="md:w-1/2 justify-evenly py-10 items-center bg-white">
          <div className="flex items-center h-[85%] justify-center">
            {loading ? (
              <h1 className="text-gray-800 font-bold text-2xl">
                Please wait...
              </h1>
            ) : (
              <>
                <h1 className="text-gray-800 font-bold text-2xl">{msg}</h1>
              </>
            )}
            <div className="flex items-center justify-center -mt-[35%]">
              <button
                className="w-full h-full"
                type="button"
                onClick={() => {
                  navigate("/signup/password");
                }}
              >
                <Button text="Continue" primary={true} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
