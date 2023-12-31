import React from "react";
import Issuance from "../../../partials/dashboard/actions/Issuance";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function IssuancePage() {
  return (
    <>
      <div className="h-screen w-full bg-white relative flex overflow-hidden">
        <aside className="h-screen flex flex-col space-y-10 items-center relative bg-[#0F163A]">
          <Sidebar />
        </aside>

        <div className="w-full h-full flex flex-col">
          <header className="h-24 w-full flex items-center relative px-5 space-x-10 bg-[#0F163A]">
            <Header />
          </header>

          <main className="max-w-full h-full flex relative overflow-y-hidden">
            <div className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col gap-4 overflow-y-scroll">
              <Issuance />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
