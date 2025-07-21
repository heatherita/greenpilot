import React, { useState } from "react";
import Modal from "react-modal";

export default function AnswerFormModal({
  question,
  setHumanAnswers,
  isOpen,
  setIsOpen,
  onRequestClose,
}) {
  const questionId = question.id;
  const [answerText, setAnswerText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("answer text ", JSON.stringify({ answerText }));
    const res = await fetch("/answer/user/answer_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerText, questionId }),
    });
    const data = await res.json();
    console.log("data returned: ", data);

    console.log(
      "humanAnswers returned: ",
      data.humanAnswers + " humanAnswers type: " + typeof humanAnswers
    );
    setHumanAnswers(data.humanAnswers || []);
    setIsOpen(false);
  };

  return (
    <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-2 border-green-800 p-4 gap-2">
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>       
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className="w-full p-2 border-stone-400 rounded"
            placeholder="They were"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-stone-600 text-white px-4 hover:bg-stone-500  active:bg-stone-500 py-2 rounded"
          >
            submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
