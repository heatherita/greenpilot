import React, { useState } from "react";

export default function AiAskForm({ question, setQuestionAI }) {
  // const [questionAI, setQuestionAI] = useState("");
  const [selectedLlm, setSelectedLlm] = useState({
    label: labelVar,
    value: valueVar,
  });

  const llms = [
    { label: "ChatGPT-4", value: "4" },
    { label: "Claude", value: "4" },
    { label: "Copilot", value: "4" },
  ];

  //   const [questionText, setQuestionText] = useState("how big is a tree");
  //   const [showCheckbox, setShowCheckbox] = useState(false);
  //   const [questionAISent, setQuestionAISent] = useState(false);

  const handleAskAI = async () => {
    // POST to notification endpoint
    const res = await fetch("/question/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionText, userId }),
    });
    // if (res.ok) {
    //   setQuestionAISent(true);
    // }
    const data = await res.json();
    console.log("data returned: ", data);
    setQuestionAI(data.question);
  };

  // Handler for checkbox change
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      handleAskAI();
    }
  };

  if (
    question &&
    Array.isArray(question.answers) &&
    question.answers.length != 0
  )
    return null;

  return (
    <div className="mt-4">
      <label>Ask AI</label>
      <select
        onChange={(e) => handleCheckboxChange}
        disabled={notificationSent}
      >
        <option value=""> -- Select an LLM -- </option>
        {llms.map((llm) => (
          <option value={llm.value}>{llm.label}</option>
        ))}
      </select>
    </div>
  );
}
