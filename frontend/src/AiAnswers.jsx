import React from "react";
import Moment from "moment";

export default function AiAnswers({ question, aiAnswers }) {
  // console.log("found question passed to CommunityAnswers:", aiAnswers);
  if (!aiAnswers || aiAnswers.length === 0) return null;

  return (
    <div className="flex min-w-[240px] h-64  flex-col  rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
      <h2 className="text-2xl font-bold">Ai Answers</h2>
      <ul className="space-y-4 text-left overflow-y-auto text-gray-500 dark:text-gray-400">
        {aiAnswers.map((answer, idx) => (
          <li key={idx}>
            <div className="text-slate-800 flex w-full items-center rounded-md p-2">
              {answer?.text.includes("\n") ? (
                <pre>{answer.text}</pre>
              ) : (
                <div>{answer.text}</div>
              )}
            </div>
            <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
              {answer?.user_answer?.fullName}
            </div>
            <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
              {answer?.user_answer?.type}
            </div>
            <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
              {answer.upvote}
            </div>
            <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
              {Moment(answer.dateCreated).format("MM-DD-YYYY mm:HH:ss")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
