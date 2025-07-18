import React from "react";
import Moment from "moment";

export default function SimilarQuestions({ similarQuestions }) {
  console.log("found similarQuestions :", similarQuestions);
  if (!similarQuestions || similarQuestions.length === 0) return null;

  return (
    <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
      <h2 className="text-2xl font-bold">Similar Questions</h2>
      {similarQuestions.map((simquestion, idx) => (
        <div key={idx}>
          <div className="text-slate-800 flex w-full items-center rounded-md p-3">
            {simquestion.name}
          </div>
          <div className="text-slate-800 flex w-full items-center rounded-md p-3">
            {simquestion.text}
          </div>
        </div>
      ))}
    </div>
  );
}
