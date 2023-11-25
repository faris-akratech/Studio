import React from "react";

export default function SingleSchemaCard({ name, type }) {
  return (
    <>
      <section class="px-4 py-2 w-full">
        <div class="h-full">
          <div class="w-full mx-auto bg-[#0F163A] shadow-lg rounded-lg">
            <div class="px-6 py-5">
              <div class="flex items-start">
                <div class="flex truncate justify-between w-full">
                  <div class="items-center">
                    <h2 class="text-2xl leading-snug font-extrabold text-white truncate">
                      {name}
                    </h2>
                  </div>
                  <div class="whitespace-normal">
                    <div class="text-indigo-100">
                      <p class="text-2xl">{type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
