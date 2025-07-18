import React, { useState } from "react";

export default function AiAskForm({
  question,
  setStagedAnswerAI,
  setShowStagedAiAnswer,
}) {
  const [selectedLlm, setSelectedLlm] = useState({
    label: "",
    value: "",
  });

  const llms = [
    { label: "ChatGPT-4", value: "4" },
    { label: "Claude", value: "4" },
    { label: "Copilot", value: "4" },
    { label: "Llama", value: "4" },
  ];

  const handleAskAI = async (e) => {
    // POST to notification endpoint
    e.preventDefault();
    console.log("question text ", JSON.stringify({ question }));
    console.log("selected Llm ", JSON.stringify({ selectedLlm }));
    const res = await fetch("/ask/ai/question_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, selectedLlm }),
    });
    const data = await res.json();
    console.log("data returned: ", data);
    setStagedAnswerAI(data.answer);
    const answerText = data.answer?.text;
    setShowStagedAiAnswer(!!answerText && answerText.length > 0);
  };

  // Handle selection change
  const handleSelectChange = (e) => {
    const llm = llms.find((l) => l.value === e.target.value);
    setSelectedLlm(llm || { label: "", value: "" });
    console.log("selected llm: ", llm);
  };

  return (
    <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-2 border-stone-600 p-4 gap-2">
      <form onSubmit={handleAskAI} className="mb-4">
        <label htmlFor="llm-select" className="mr-2">
          Ask AI
        </label>
        <select
          id="llm-select"
          value={selectedLlm.value}
          onChange={handleSelectChange}
        >
          <option value=""> -- Select an LLM -- </option>
          {llms.map((llm) => (
            <option key={llm.value} value={llm.value}>
              {llm.label}
            </option>
          ))}
        </select>
        <button
          disabled={!selectedLlm.value}
          type="submit"
          className="ml-2 mr-2 bg-stone-600 hover:bg-stone-500  active:bg-stone-500 text-white px-4 py-2 rounded"
        >
          Ask Selected AI
        </button>
      </form>
    </div>
  );
}
