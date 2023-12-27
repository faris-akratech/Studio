import React from "react";

export default function OrgCard({
  orgName,
  orgDescription,
  orgRoles,
  orgImage,
}) {
  return (
    <>
      <div className="rounded-lg px-6 py-4 text-sm bg-[#EDEDED] text-[#0F163A] relative overflow-hidden w-full border-2 hover:border-[#0F163A] duration-200 ease-in-out">
        <div className="py-2">
          <svg
            width="314"
            height="214"
            viewBox="0 0 314 214"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute right-0 top-0"
          >
            <path
              d="M174.5 6V-23.5L233 36H204.5C187.931 36 174.5 22.5685 174.5 6Z"
              fill="#0F163A"
            ></path>
            <path
              d="M174.5 6V-23.5L116 36H144.5C161.069 36 174.5 22.5685 174.5 6Z"
              fill="#FF7F43"
            ></path>
            <path
              d="M116.5 65.5V36L175 95.5H146.5C129.931 95.5 116.5 82.0685 116.5 65.5Z"
              fill="#FF7F43"
            ></path>
            <path
              d="M116.5 65.5V36L58 95.5H86.5C103.069 95.5 116.5 82.0685 116.5 65.5Z"
              fill="#9C02FC"
            ></path>
            <path
              d="M59.5 125V95.5L118 155H89.5C72.9315 155 59.5 141.569 59.5 125Z"
              fill="#9C02FC"
            ></path>
            <path
              d="M59.5 125V95.5L1.00003 155H29.5C46.0686 155 59.5 141.569 59.5 125Z"
              fill="#0F163A"
            ></path>
            <path
              d="M58.5 184.5L58.5 214L-5.20166e-06 154.5L28.5 154.5C45.0685 154.5 58.5 167.931 58.5 184.5Z"
              fill="#6B6B70"
            ></path>
            <path
              d="M58.5 184.5L58.5 214L117 154.5L88.5 154.5C71.9315 154.5 58.5 167.931 58.5 184.5Z"
              fill="#2F3B4B"
            ></path>
            <path
              d="M174.5 125V95.5L233 155H204.5C187.931 155 174.5 141.569 174.5 125Z"
              fill="##6B6B70"
            ></path>
            <path
              d="M174.5 125V95.5L116 155H144.5C161.069 155 174.5 141.569 174.5 125Z"
              fill="#2F3B4B"
            ></path>
            <path
              d="M173.5 184.5L173.5 214L115 154.5L143.5 154.5C160.069 154.5 173.5 167.931 173.5 184.5Z"
              fill="#0F163A"
            ></path>
            <path
              d="M173.5 184.5L173.5 214L232 154.5L203.5 154.5C186.931 154.5 173.5 167.931 173.5 184.5Z"
              fill="#FF7F43"
            ></path>
            <path
              d="M289.5 125V95.5L348 155H319.5C302.931 155 289.5 141.569 289.5 125Z"
              fill="##6B6B70"
            ></path>
            <path
              d="M289.5 125V95.5L231 155H259.5C276.069 155 289.5 141.569 289.5 125Z"
              fill="#9C02FC"
            ></path>
            <path
              d="M288.5 184.5L288.5 214L230 154.5L258.5 154.5C275.069 154.5 288.5 167.931 288.5 184.5Z"
              fill="##6B6B70"
            ></path>
            <path
              d="M288.5 184.5L288.5 214L347 154.5L318.5 154.5C301.931 154.5 288.5 167.931 288.5 184.5Z"
              fill="#FF7F43"
            ></path>
            <path
              d="M286.5 6V-23.5L345 36H316.5C299.931 36 286.5 22.5685 286.5 6Z"
              fill="#0F163A"
            ></path>
            <path
              d="M286.5 6V-23.5L228 36H256.5C273.069 36 286.5 22.5685 286.5 6Z"
              fill="#9C02FC"
            ></path>
            <path
              d="M346.5 66.5V37L288 96.5H316.5C333.069 96.5 346.5 83.0685 346.5 66.5Z"
              fill="#0F163A"
            ></path>
            <g>
              <path
                d="M233 65.5V36L291.5 95.5H263C246.431 95.5 233 82.0685 233 65.5Z"
                fill="#FF7F43"
              ></path>
              <path
                d="M233 65.5V36L174.5 95.5H203C219.569 95.5 233 82.0685 233 65.5Z"
                fill="#0F163A"
              ></path>
            </g>
          </svg>
          <div className="flex">
            <div className="mx-5">
              <img
                src={orgImage}
                alt={`${orgName}'s image`}
                className="h-20 w-20 aspect-square"
              />
            </div>
            <div className="">
              <div className="flex flex-col">
                <div className="text-2xl flex flex-col">{orgName}</div>
              </div>
              <div className="flex flex-col">
                <div className="mt-1 flex flex-col">{orgDescription}</div>
              </div>
              <div className="flex flex-col">
                <div className="mt-1 flex flex-col">{orgRoles}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
