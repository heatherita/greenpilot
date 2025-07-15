import React from "react";
import Moment from "moment";

export default function AnswerList({ question, similarQuestions }) {
  console.log("found question passed to AnswerList:", question);
  //  if (!answers || answers.length === 0) return null;
  if (!question) return null;

  return (
    <div class="relative flex flex-col space-y-6">
      <div class="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-stone-600 p-4 gap-2">
        <h2 class="text-2xl font-bold">Question</h2>
        <a href="#" class="text-initial">
          <div
            role="button"
            class="text-slate-800 flex w-full items-center rounded-md p-2 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            {question.name}
          </div>
        </a>
        <div class="text-slate-800 flex w-full items-center rounded-md p-2">
          {question.text}
        </div>

        <div class="text-slate-800 w-full items-center rounded-md p-2 inline-block">
          Deidre Parker Bowles
        </div>
        <div class="text-slate-800 w-full items-center rounded-md p-2 inline-block">
          {Moment(question.dateCreated).format("MM-DD-YYYY mm:HH:ss")}
        </div>
      </div>

      <div class="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-stone-600 p-4 gap-2">
        <h2 class="text-2xl font-bold">Answers</h2>
        <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
          {question.answers.map((answer, idx) => (
            <li key={idx}>
              <svg
                class="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
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
              <div class="text-slate-800 flex w-full items-center rounded-md p-2">
                {answer.text}
              </div>
              <div class="text-slate-800 flex w-full items-center rounded-md p-2">
                {answer.upvoteCount}
              </div>
              <div class="text-slate-800 flex w-full items-center rounded-md p-2">
                {answer.downvoteCount}
              </div>
              <div class="text-slate-800 w-fit rounded-md p-2 inline-block">
                Heather M Propes
              </div>
              <div class="text-slate-800 w-fit rounded-md p-2 inline-block">
                {Moment(answer.dateCreated).format("MM-DD-YYYY mm:HH:ss")}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div class="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-stone-600 p-4 gap-2">
        <h2 class="text-2xl font-bold">Similar Questions</h2>
        {similarQuestions.map((simquestion, idx) => (
          <div key={idx}>
            <div class="text-slate-800 flex w-full items-center rounded-md p-3">
              {simquestion.name}
            </div>
            <div class="text-slate-800 flex w-full items-center rounded-md p-3">
              {simquestion.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
