import React from "react"

export default function AnswerList({ answer }) {
  return (
    <div className="border p-4 rounded bg-gray-50">
      <p className="text-sm text-gray-500">Source: {answer.source}</p>
      <p className="mt-2 whitespace-pre-wrap">{answer.answer}</p>
    </div>
  )
}