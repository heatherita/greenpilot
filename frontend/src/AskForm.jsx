import React, { useState } from "react";
import AiAskForm from "./AiAskForm";

export default function AskForm({ setQuestion, setSimilarQuestions }) {
  const [questionText, setQuestionText] = useState("how big is a tree");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("question text ", JSON.stringify({ questionText }));
    const res = await fetch("/questions/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionText }),
    });
    const data = await res.json();
    console.log("data returned: ", data);
    setQuestion(data.question);
    setSimilarQuestions(data.similarQuestions);

    // Show checkbox if there are no answers
    if (
      data.question &&
      Array.isArray(data.question.answers) &&
      data.question.answers.length === 0
    ) {
      setShowCheckbox(true);
    } else {
      setShowCheckbox(false);
    }
  };

  return (
    <div className="relative flex flex-col space-y-6">
      <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-2 border-stone-600 p-4 gap-2">
        <h2 className="text-2xl font-bold">Ask</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 border-stone-400 rounded"
            placeholder="How big is a house the?"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-stone-600 text-white px-4 py-2 rounded"
          >
            Ask a question
          </button>
          <AiAskForm question={question} />
        </form>
      </div>
    </div>
  );
}
