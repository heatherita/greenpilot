import React, { useState } from "react";
import Menu from "./Menu";
import AskForm from "./AskForm";
import AiAskForm from "./AiAskForm";
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
  const [showAiAsk, setShowAiAsk] = useState(false);
  const [showStagedAiAnswer, setShowStagedAiAnswer] = useState(false);

  const resetAll = () => {
    setQuestion("");
    setStagedAnswerAi("");
    setSimilarQuestions([]);
    setShowAiAsk(false);
    setShowStagedAiAnswer(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex min-h-screen">
        <Menu />
        <main className="flex-1 p-6">
          <section className="p-6 rounded-soft shadow-soft  border-blue-300">
            <div className="relative flex flex-col space-y-6">
              <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm border-2 border-stone-600 p-4 gap-2">
                <h2 className="text-2xl font-bold">Ask</h2>
                <AskForm
                  setQuestion={setQuestion}
                  setAiAnswers={setAiAnswers}
                  setHumanAnswers={setHumanAnswers}
                  setSimilarQuestions={setSimilarQuestions}
                  setShowAiAsk={setShowAiAsk}
                  resetAll={resetAll}
                />
              </div>
              {showAiAsk && (
                <AiAskForm
                  question={question}
                  setShowStagedAiAnswer={setShowStagedAiAnswer}
                  setStagedAnswerAi={setStagedAnswerAi}
                />
              )}
            </div>
          </section>
          <section className="bg-white p-6 rounded-soft shadow-soft">
            <div className="relative flex flex-col space-y-6">
              <OriginalQuestion question={question} />
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
            {showStagedAiAnswer && <StagedAiAnswer answer={stagedAnswerAI} />}
          </section>
          <section className="bg-white p-6 rounded-soft shadow-soft">
            <div className="relative flex flex-col space-y-6">
              <SimilarQuestions similarQuestions={similarQuestions} />
            </div>
          </section>
        </main>
      </div>
      <footer className="bg-gray-200 p-4 text-center">© 2025 My Site</footer>
    </div>
  );
}
