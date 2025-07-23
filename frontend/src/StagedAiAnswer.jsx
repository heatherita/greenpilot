import React, { useEffect, useState } from "react";
import Moment from "moment";

export default function StagedAiAnswer({
  question,
  stagedAiAnswer,
  setStagedAiAnswer,
  setAiAnswers,
  setHumanAnswers,
}) {
  console.log("Found AI Staged Answer:", stagedAiAnswer);
  if (!stagedAiAnswer) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/accept/ai/answer_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, stagedAiAnswer }),
    });
    const data = await res.json();
    setStagedAiAnswer("");
    refreshAnswers();
    console.log("data returned: ", data);
  };

  // console.log("updating answers with useeffect in staged ai answer");
  const refreshAnswers = () => {
    fetch("/search/question/" + question.id)
      .then((res) => res.json())
      .then((data) => {
        setHumanAnswers(data?.humanAnswers || []);
        setAiAnswers(data?.aiAnswers || []);
      });
  };

  return (
    <div className="relative flex flex-col space-y-6">
      <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
        <h2 className="text-2xl font-bold">Staged AI Answer</h2>

        <div className="text-slate-800 flex w-full items-center rounded-md p-2">
          {stagedAiAnswer?.text.includes("\n") ? (
            <pre>{stagedAiAnswer.text}</pre>
          ) : (
            <div>{stagedAiAnswer.text}</div>
          )}
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
          {stagedAiAnswer?.user_answer.fullName}
        </div>
        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {stagedAiAnswer?.user_answer?.type}
        </div>
      </div>
    </div>
  );
}
