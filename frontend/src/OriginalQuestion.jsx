import React from "react";
import Moment from "moment";

export default function OriginalQuestion({ question }) {
  console.log("found question passed to OriginalQuestion:", question);
  if (!question) return null;

  return (
    <div className="flex min-w-[240px] flex-col rounded-lg shadow-sm bg-stone-600/20 border-stone-600 p-4 gap-2">
      <h2 className="text-2xl font-bold">Original Question</h2>
      <div className="space-y-4 text-left text-gray-500 dark:text-gray-400">
        <a href="#" className="text-initial">
          <div
            role="button"
            className="text-slate-800 flex w-full items-center rounded-md p-2 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            {question.text}
          </div>
        </a>
        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {question.user_question.fullName}
        </div>

        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {question.user_question.type}
        </div>

        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {Moment(question.dateCreated).format("MM-DD-YYYY mm:HH:ss")}
        </div>
      </div>
    </div>
  );
}
