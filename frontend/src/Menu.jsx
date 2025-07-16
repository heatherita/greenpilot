import React, { useState } from "react";

export default function Menu() {
  const [status, setStatus] = useState("");

  const handleAddData = async (e) => {
    e.preventDefault();
    const res = await fetch("/data/add", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data);
  };

  const handleDeleteData = async (e) => {
    e.preventDefault();
    const res = await fetch("/data/delete", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data);
  };

  const handleRebuildData = async (e) => {
    e.preventDefault();
    const res = await fetch("/data/recreate", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <section>
        <div className="flex flex-col mt-[1rem] space-y-6">
          <div className="flex items-center justify-center p-2">
            <div className="flex flex-col items-start space-y-6">
              <div className="z-30 w-full px-4 h-10 bg-teal-300/30 border border-stone-300/50 rounded-xl shadow-lg top-2 ml-[-2rem] mb-[-2rem]">
                <h2 className="text-3xl text-white font-mono">Green</h2>
              </div>
              <div className="z-20 w-full pl-10 h-12 bg-stone-300/10 border border-stone-300/20 rounded-xl shadow-lg ml-[2rem]  mb-[-2rem]">
                <h2 className="text-3xl px-4 pl-[2rem] font-mono">Pilot</h2>
              </div>
              <div className="z-10 w-full px-6 bg-gray-300/20 border border-gray-400/20 rounded-xl shadow-xl">
                <div className="mt-2 text-l leading-relaxed">
                  Greenpilot helps individuals and small businesses track their
                  carbon use with ease.
                </div>
                <div className="mt-4 ml-8 mb-2 text-l">
                  "I love it."-- Heather Propes
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-soft shadow-soft">
            <nav>
              <form className="flex mb-4">
                <div className="space-y-4">
                  <button
                    onClick={handleAddData}
                    className="mt-2 bg-teal-500 text-white px-4 py-2 rounded"
                  >
                    Add new data
                  </button>
                  <button
                    onClick={handleDeleteData}
                    className="mt-2  bg-teal-500 text-white px-4 py-2 rounded"
                  >
                    Delete data
                  </button>
                  <button
                    onClick={handleRebuildData}
                    className="mt-2  bg-teal-500 text-white px-4 py-2 rounded"
                  >
                    Rebuild data
                  </button>
                </div>
              </form>
            </nav>
          </div>
        </div>
      </section>
    </aside>
  );
}
