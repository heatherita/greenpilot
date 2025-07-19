import React from "react";
import Moment from "moment";

export default function StagedAiAnswer({ question, answer }) {
  console.log("Found AI Staged Answer:", answer);
  if (!answer) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/accept/ai/answer_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });
    const data = await res.json();
    console.log("data returned: ", data);
  };

  return (
    <div className="relative flex flex-col space-y-6">
      <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
        <h2 className="text-2xl font-bold">AI Answer</h2>

        <div className="text-slate-800 flex w-full items-center rounded-md p-2">
          <pre>{answer.text}</pre>
        </div>
        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          Accept Answer
          <form onSubmit={handleSubmit} className="mb-4">
            <button className="mt-2 bg-stone-60 px-4 hover:bg-stone-500  active:bg-stone-500 py-2 rounded">
              <svg
                className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </button>
          </form>
        </div>

        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {answer?.user_answer.fullName}
        </div>
        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {answer?.user_answer?.type}
        </div>
      </div>
    </div>
  );
}
