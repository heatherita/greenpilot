import React, { useState } from "react"

export default function AskForm({ setQuestion, setSimilarQuestions }) {
const [questionText, setQuestionText] = useState(null);


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('question text ', JSON.stringify({ questionText }))
  const res = await fetch("/questions/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionText }),
  });
  const data = await res.json();
  console.log('data returned: ',data)
  setQuestion(data.question)
  setSimilarQuestions(data.similarQuestions)
};

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="w-full p-2 border-stone-400 rounded"
        placeholder="How big is a house the?"
        required
      />
      <button type="submit" className="mt-2 bg-stone-600 text-white px-4 py-2 rounded">
        Ask a question
      </button>
    </form>
  )
}
