import React, { useState } from "react";

export default function AskForm({
  setQuestion,
  setAiAnswers,
  setHumanAnswers,
  setSimilarQuestions,
  resetAll,
}) {
  const [questionText, setQuestionText] = useState(
    "who were the first europeans in brazil?"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetAll();
    console.log("question text ", JSON.stringify({ questionText }));
    const res = await fetch("/ask/user/question_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionText }),
    });
    const data = await res.json();
    console.log("data returned: ", data);

    console.log(
      "aiAnswers returned: ",
      data.aiAnswers + " aiAnswers type: " + typeof aiAnswers
    );
    console.log(
      "humanAnswers returned: ",
      data.humanAnswers + " humanAnswers type: " + typeof humanAnswers
    );
    setQuestion(data.question);
    setAiAnswers(data.aiAnswers || []);
    setHumanAnswers(data.humanAnswers || []);
    setSimilarQuestions(data.similarQuestions || []);
    // const answers = data.question?.answers;
  };

  return (
    <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-2 border-stone-600 p-4 gap-2">
      <h2 className="text-2xl font-bold">Ask</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full p-2 border-stone-400 rounded"
          placeholder="who"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-stone-600 text-white px-4 hover:bg-stone-500  active:bg-stone-500 py-2 rounded"
        >
          Ask a question
        </button>
      </form>
    </div>
  );
}
