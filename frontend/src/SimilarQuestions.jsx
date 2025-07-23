import React from "react";
import Moment from "moment";

export default function SimilarQuestions({
  similarQuestions,
  setQuestion,
  setAiAnswers,
  setHumanAnswers,
}) {
  console.log("found similarQuestions :", similarQuestions);
  if (!similarQuestions || similarQuestions.length === 0) return null;

  const handleQuestionSelect = (sqId, idx) => (e) => {
    //e.preventDefault();
    console.log("item id: ", sqId);
    console.log("item index: ", idx);
    console.log("event: ", e.target);
    console.log("similarQuestions ", similarQuestions);
    // const simQuestion = similarQuestions.find((item) => sqId === item.id);
    const simQuestion = similarQuestions.at(idx);
    setQuestion(simQuestion); // Or simquestion.text, depending on your structure
    const answers = simQuestion.answers;

    const ai_answers = answers.filter((item) =>
      "ai".match(item.user_answer.type)
    );

    const human_answers = answers.filter((item) =>
      "human".match(item.user_answer.type)
    );
    console.log("similar question ai answers: ", ai_answers);
    setQuestion(simQuestion);
    setAiAnswers(ai_answers || []); // adjust as needed
    setHumanAnswers(human_answers || []);
  };

  return (
    <div className="flex min-w-[240px] flex-col h-64 rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
      <h2 className="text-2xl font-bold">Similar Questions</h2>
      <ul className="space-y-4 text-left overflow-y-auto text-gray-500 dark:text-gray-400">
        {similarQuestions.map((simquestion, idx) => (
          <li key={idx}>
            <div
              className="flex w-full items-center rounded-md text-initial p-3 text-slate-800 bg-slate-200  hover:bg-slate-100  active:bg-slate-100"
              onClick={handleQuestionSelect(simquestion.id, idx)}
            >
              {simquestion.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
