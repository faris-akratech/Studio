import React from "react";
import Footer from "../../components/Footer";
import Login from "../../partials/authentication/Login";

export default function LoginPage() {
  return (
    <>
      <div className="overflow-hidden">
        <div className="absolute w-full top-0">
          <nav className="border-b bg-[#0F163A] border-[#0F163A] sm:py-2 w-full">
            <div className="flex items-center justify-between w-full py-2">
              <a className="flex ml-4 items-center justify-center" href="/">
                <div className="">
                  <img
                    src="/images/logo.png"
                    alt="Nashid"
                    className="w-28 ml-10"
                  />
                </div>
              </a>
            </div>
          </nav>
        </div>
        <Login />
        <div className="absolute w-full bottom-0">
          <Footer />
        </div>
      </div>
    </>
  );
}
