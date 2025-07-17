import React from "react";
import Moment from "moment";

export default function AiAnswer({ answer }) {
  console.log("Found AI Staged Answer:", answer);
  if (!answer) return null;

  return (
    <div className="relative flex flex-col space-y-6">
      <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
        <h2 className="text-2xl font-bold">AI Answer</h2>
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
        <div className="text-slate-800 flex w-full items-center rounded-md p-2">
          {answer.text}
        </div>
        <div className="text-slate-800 flex w-full items-center rounded-md p-2">
          {answer.upvoteCount}
        </div>
        <div className="text-slate-800 flex w-full items-center rounded-md p-2">
          {answer.downvoteCount}
        </div>
        <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
          {answer?.user_answer?.fullName}
        </div>
        <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
          {answer?.user_answer?.type}
        </div>
        <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
          {Moment(answer.dateCreated).format("MM-DD-YYYY mm:HH:ss")}
        </div>
      </div>
    </div>
  );
}
