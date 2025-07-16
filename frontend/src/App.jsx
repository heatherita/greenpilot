import React, { useState } from "react";
import Menu from "./Menu";
import AnswerList from "./AnswerList";
import AskForm from "./AskForm";

export default function App() {
  const [question, setQuestion] = useState("");
  const [questionAI, setQuestionAI] = useState("");
  const [similarQuestions, setSimilarQuestions] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex min-h-screen">
        <Menu />
        <main className="flex-1 p-6">
          <section className="p-6 rounded-soft shadow-soft  border-blue-300">
            <AskForm
              question={question}
              setQuestion={setQuestion}
              setQuestionAI={setQuestionAI}
              setSimilarQuestions={setSimilarQuestions}
            />
          </section>
          <section className="bg-white p-6 rounded-soft shadow-soft">
            <AnswerList
              question={question}
              questionAI={questionAI}
              similarQuestions={similarQuestions}
            />
          </section>
        </main>
      </div>
      <footer className="bg-gray-200 p-4 text-center">© 2025 My Site</footer>
    </div>
  );
}
