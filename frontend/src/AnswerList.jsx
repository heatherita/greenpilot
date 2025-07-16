import React from "react";
import Moment from "moment";

export default function AnswerList({ question, similarQuestions }) {
  console.log("found question passed to AnswerList:", question);
  //  if (!answers || answers.length === 0) return null;
  if (!question) return null;

  return (
    <div className="relative flex flex-col space-y-6">
      <div className="flex min-w-[240px] flex-col rounded-lg shadow-sm bg-stone-600/20 border-stone-600 p-4 gap-2">
        <h2 className="text-2xl font-bold">Question</h2>
        <div className="space-y-4 text-left text-gray-500 dark:text-gray-400">
          <a href="#" className="text-initial">
            <div
              role="button"
              className="text-slate-800 flex w-full items-center rounded-md p-2 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              {question.name}
            </div>
          </a>
          <div className="text-slate-800 flex w-full items-center rounded-md p-2">
            {question.text}
          </div>

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

      <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
        <h2 className="text-2xl font-bold">Answers</h2>
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
          {question.answers.map((answer, idx) => (
            <li key={idx}>
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
                {answer.user_answer.fullName}
              </div>
              <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
                {answer.user_answer.type}
              </div>
              <div className="text-slate-800 w-fit rounded-md p-2 inline-block">
                {Moment(answer.dateCreated).format("MM-DD-YYYY mm:HH:ss")}
              </div>
            </li>
          ))}
        </ul>
      </div>

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
    </div>
  );
}
