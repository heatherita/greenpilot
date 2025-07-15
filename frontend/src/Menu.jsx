import React, { useState } from "react";

export default function Menu() {
  const [status, setStatus] = useState("");

  const handleAddData = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/data/add", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data);
  };

  const handleDeleteData = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/data/delete", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data);
  };

  const handleRebuildData = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/data/recreate", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data);
  };

  return (
    <form class="flex mb-4">
      <div class="space-y-4">
        <button
          onClick={handleAddData}
          class="mt-2 bg-teal-500 text-white px-4 py-2 rounded"
        >
          Add new data
        </button>
        <button
          onClick={handleDeleteData}
          class="mt-2  bg-teal-500 text-white px-4 py-2 rounded"
        >
          Delete data
        </button>
        <button
          onClick={handleRebuildData}
          class="mt-2  bg-teal-500 text-white px-4 py-2 rounded"
        >
          Rebuild data
        </button>
      </div>
    </form>
  );
}
