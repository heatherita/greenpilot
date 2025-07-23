import React, { useState } from "react";
import Moment from "moment";
import AiAskFormModal from "./AiAskFormModal";
import AnswerFormModal from "./AnswerFormModal";
import { useModalManager } from "./hooks/Helpers";

export default function OriginalQuestion({
  question,
  setStagedAnswerAi,
  setHumanAnswers,
}) {
  console.log("found question passed to OriginalQuestion:", question);
  if (!question) return null;
  const {
    openModal,
    closeModal,
    toggleModal,
    currentModal,
    isOpen,
    setIsOpen,
  } = useModalManager();

  return (
    <div className="flex min-w-[240px] flex-col rounded-lg shadow-sm bg-stone-600/20 border-stone-600 p-4 gap-2">
      <h2 className="text-2xl font-bold">Current Question</h2>
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
          {question?.user_question?.fullName}
        </div>

        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {question?.user_question?.type}
        </div>

        <div className="text-slate-800 w-fit inline-block rounded-md p-2">
          {Moment(question.dateCreated).format("MM-DD-YYYY mm:HH:ss")}
        </div>

        <div className="w-fit p-2 inline-block">
          <button
            className="mt-2 bg-stone-600 text-white px-4 hover:bg-stone-500  active:bg-stone-500 py-2 rounded"
            onClick={() => openModal("answerModal")}
          >
            Answer Question Modal
          </button>
        </div>
        <div className="w-fit p-2 inline-block">
          <button
            className="mt-2 bg-stone-600 text-white px-4 hover:bg-stone-500  active:bg-stone-500 py-2 rounded"
            onClick={() => openModal("aiAskModal")}
          >
            Ask AI Modal
          </button>
        </div>
      </div>
      {currentModal === "answerModal" && (
        <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-2 border-stone-600 p-4 gap-2">
          <AnswerFormModal
            question={question}
            setHumanAnswers={setHumanAnswers}
            closeModal={closeModal}
            isOpen={() => setIsOpen(true)}
          />
        </div>
      )}

      {currentModal === "aiAskModal" && (
        <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-2 border-stone-600 p-4 gap-2">
          <AiAskFormModal
            question={question}
            setStagedAnswerAi={setStagedAnswerAi}
            closeModal={closeModal}
            isOpen={() => setIsOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
