import React from "react";
import Moment from "moment";

export default function SimilarQuestions({
  similarQuestions,
  setQuestion,
  setAiAnswers,
  setHumanAnswers,
  setShowAiAsk,
  resetAll,
}) {
  console.log("found similarQuestions :", similarQuestions);
  if (!similarQuestions || similarQuestions.length === 0) return null;

  const handleQuestionSelect = (sqId, idx) => (e) => {
    //e.preventDefault();
    console.log("item id: ", sqId);
    console.log("item index: ", idx);
    console.log("event: ", e.target);
    console.log("similarQuestions ", similarQuestions);
    // resetAll();
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
    setAiAnswers(ai_answers || []); // adjust as needed
    setHumanAnswers(human_answers || []);
    setShowAiAsk(false); // If you want to hide AI ask when showing this
  };

  return (
    <div className="flex min-w-[240px] flex-col  rounded-lg shadow-sm  bg-stone-600/20 border-stone-600 p-4 gap-2">
      <h2 className="text-2xl font-bold">Similar Questions</h2>
      {similarQuestions.map((simquestion, idx) => (
        <div key={idx}>
          <button
            className="bg-stone-600 text-white hover:bg-stone-500  active:bg-stone-500 p-2 rounded"
            onClick={handleQuestionSelect(simquestion.id, idx)}
          >
            Show Question
          </button>
          <div className="text-slate-800 flex w-full items-center rounded-md p-3">
            {simquestion.name}
          </div>
          <div className="text-slate-800 flex w-full items-center rounded-md p-3">
            {simquestion.text}
          </div>
        </div>
      ))}
    </div>
  );
}
