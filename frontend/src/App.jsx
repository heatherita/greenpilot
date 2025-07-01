import React, { useState } from "react"
import Menu from "./Menu"
import AnswerList from "./AnswerList"
import AskForm from "./AskForm"

export default function App() {
  const [answer, setAnswer] = useState(null)

  return (
    <div className="p-6 max-w-xl mx-auto">
    <Menu />
      <h1 className="text-2xl font-bold mb-4">Green Copilot</h1>
      <AskForm setAnswer={setAnswer} />
      {answer && <AnswerList answer={answer} />}
    </div>
  )
}