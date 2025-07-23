import React, { useEffect, useState } from "react";

import Menu from "./Menu";
import AskForm from "./AskForm";
import StagedAiAnswer from "./StagedAiAnswer";
import OriginalQuestion from "./OriginalQuestion";
import CommunityAnswers from "./CommunityAnswers";
import AiAnswers from "./AiAnswers";
import SimilarQuestions from "./SimilarQuestions";

export default function App() {
  const [question, setQuestion] = useState("");
  const [aiAnswers, setAiAnswers] = useState([]);
  const [humanAnswers, setHumanAnswers] = useState([]);
  const [stagedAnswerAi, setStagedAnswerAi] = useState("");
  const [similarQuestions, setSimilarQuestions] = useState([]);

  const resetAll = () => {
    setQuestion("");
    setStagedAnswerAi("");
    setSimilarQuestions([]);
  };

  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex min-h-screen">
        <Menu />
        <main className="flex-1 p-6">
          <section className="p-6 rounded-soft shadow-soft  border-blue-300">
            <div className="relative flex flex-col space-y-6">
              <AskForm
                setQuestion={setQuestion}
                setAiAnswers={setAiAnswers}
                setHumanAnswers={setHumanAnswers}
                setSimilarQuestions={setSimilarQuestions}
                resetAll={resetAll}
              />
            </div>
          </section>
          <section className="bg-white p-6 rounded-soft shadow-soft">
            <div className="relative flex flex-col space-y-6">
              <SimilarQuestions
                similarQuestions={similarQuestions}
                setQuestion={setQuestion}
                setAiAnswers={setAiAnswers}
                setHumanAnswers={setHumanAnswers}
              />
            </div>
          </section>

          {!!question && (
            <section className="bg-white p-6 rounded-soft shadow-soft">
              <div className="relative flex flex-col space-y-6">
                <OriginalQuestion
                  question={question}
                  setStagedAnswerAi={setStagedAnswerAi}
                  setHumanAnswers={setHumanAnswers}
                />
              </div>
            </section>
          )}

          <section className="bg-white p-6 rounded-soft shadow-soft">
            <div className="relative flex flex-col space-y-6">
              {!!humanAnswers && humanAnswers.length > 0 && (
                <CommunityAnswers
                  question={question}
                  humanAnswers={humanAnswers}
                />
              )}
            </div>
          </section>
          <section className="bg-white p-6 rounded-soft shadow-soft">
            <div className="relative flex flex-col space-y-6">
              {!!aiAnswers && aiAnswers.length > 0 && (
                <AiAnswers question={question} aiAnswers={aiAnswers} />
              )}
            </div>
          </section>
          <section className="bg-white p-6 rounded-soft shadow-soft">
            {stagedAnswerAi && (
              <StagedAiAnswer
                question={question}
                stagedAiAnswer={stagedAnswerAi}
                setStagedAiAnswer={setStagedAnswerAi}
                setAiAnswers={setAiAnswers}
                setHumanAnswers={setHumanAnswers}
              />
            )}
          </section>
        </main>
      </div>
      <footer className="bg-gray-200 p-4 text-center">© 2025 My Site</footer>
    </div>
  );
}
