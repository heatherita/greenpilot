import React, { useState } from "react";
import Menu from "./Menu";
import AnswerList from "./AnswerList";
import AskForm from "./AskForm";

export default function App() {
  const [question, setQuestion] = useState(null);
  const [similarQuestions, setSimilarQuestions] = useState([]);

  return (
    <body class="min-h-screen flex flex-col">
      <div class="flex min-h-screen">
        <aside class="w-64 bg-gray-800 text-white p-4">
          <section>
            <div class="flex flex-col mt-[1rem] space-y-6">
              <div class="flex items-center justify-center p-2">
                <div class="flex flex-col items-start space-y-6">
                  <div class="z-30 w-full px-4 h-10 bg-teal-300/30 border border-stone-300/50 rounded-xl shadow-lg top-2 ml-[-2rem] mb-[-2rem]">
                    <h2 class="text-3xl text-white font-mono">Green</h2>
                  </div>
                  <div class="z-20 w-full pl-10 h-12 bg-stone-300/10 border border-stone-300/20 rounded-xl shadow-lg ml-[2rem]  mb-[-2rem]">
                    <h2 class="text-3xl px-4 pl-[2rem] font-mono">Pilot</h2>
                  </div>
                  <div class="z-10 w-full px-6 bg-gray-300/20 border border-gray-400/20 rounded-xl shadow-xl">
                    <div class="mt-10 text-xl leading-relaxed">
                      Greenpilot helps individuals and small businesses track
                      their carbon use with ease.
                    </div>
                    <div class="mt-5 ml-8 text-xl">
                      "I love it."-- Heather Propes
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white p-6 rounded-soft shadow-soft">
                <nav>
                  <Menu />
                </nav>
              </div>
            </div>
          </section>
        </aside>
        <main class="flex-1 p-6">
          <section class="p-6 rounded-soft shadow-soft  border-blue-300">
            <div class="absolute top-26 pt-50 left-80 w-72 h-96  bg-gray-400/20 border border-gray-400/20 rounded-xl shadow-xl z-30">
              <AskForm
                setQuestion={setQuestion}
                setSimilarQuestions={setSimilarQuestions}
              />
            </div>
          </section>
          <section class="bg-white p-6 rounded-soft shadow-soft">
            <AnswerList
              question={question}
              similarQuestions={similarQuestions}
            />
          </section>
        </main>
      </div>
      <footer class="bg-gray-200 p-4 text-center">© 2025 My Site</footer>
    </body>
  );
}
