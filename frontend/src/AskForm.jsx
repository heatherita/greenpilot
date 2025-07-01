import React, { useState } from "react"

export default function AskForm({ setAnswer }) {
  const [question, setQuestion] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })
    const data = await res.json()
    setAnswer(data)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Ask a question..."
        required
      />
      <button type="submit" className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
        Ask Copilot
      </button>
    </form>
  )
}