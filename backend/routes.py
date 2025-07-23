from datetime import datetime

from flask import Flask, Blueprint, request, redirect, jsonify, render_template, send_from_directory, current_app
from openai import OpenAI
from sqlalchemy import desc
from backend.models.data_helper import DataHelper
from backend.models.question import Question
from backend.models.answer import Answer
from backend.models.schemas import QuestionSchema, AnswerSchema
from backend.models.user import User
from backend.models import db, user
from dotenv import load_dotenv
import spacy
import os
import json

# Base.metadata.create_all(bind=engine)
bp = Blueprint("api", __name__)

load_dotenv()  # take environment variables from .env
openai = OpenAI() #magically gets them from environment

@bp.route('/ask/ai/question_text',methods=['POST'])
def ask_ai():
    print('in ask_ai')
    data = request.json
    question = data.get("question")
    selected_llm = data.get("selectedLlm")
    print('question : ', question)
    print('llm_user: ', selected_llm)
    llm_user = User.query.filter_by(id=selected_llm["value"]).first()
    print('llm_user_name: ', llm_user.fullName, ' llm_user: ', llm_user.id)

    # gpt answer stuff figure out how to use it
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question["text"].rstrip('[!?.]')}]
    )
    gpt_resp = response.choices[0].message.content
    gpt_answer = Answer(name="", text=gpt_resp, dateCreated=datetime.now(), user_id=llm_user.id, user_answer=llm_user, question_id=question["id"])
    answer_schema = AnswerSchema(many=False)
    answer = answer_schema.dump(gpt_answer)
    return jsonify({"answer": answer})

@bp.route('/answer/user/answer_text',methods=['POST'])
def answer_user():
    print('in answer_user')
    data = request.json
    question_id = data.get("questionId")
    print('question id : ', question_id)
    answer_text = data.get("answerText")
    print('answer text: ', answer_text)
    return_json = {}

    user = User.query.filter_by(email="hbuch4@yahoo.com").first()

    print('human_user_name: ', user.fullName, 'human_user: ',user.id)

    user_answer = Answer(name="", text=answer_text, dateCreated=datetime.now(), user_id=user.id, question_id=question_id)

    # answer = {"text": gpt_resp, "user": llm_user}
    db.session.add(user_answer)
    db.session.flush()
    db.session.commit()

    question = Question.query.filter_by(id=question_id).first()
    answers = question.answers
    answers_schema = AnswerSchema(many=True)

    if answers:
        answers_human = [item for item in answers if item.user_answer.type == "human"]
        print("human answers", answers_human)
        answers_human_result = answers_schema.dump(answers_human)
        return_json["humanAnswers"] = answers_human_result

    return jsonify(return_json)

@bp.route('/accept/ai/answer_text',methods=['POST'])
def accept_answer_ai():
    print('in accept_answer_ai')
    data = request.json
    question = data.get("question")
    answer_result = data.get("stagedAiAnswer")

    llm_user = answer_result["user_answer"]
    print('answer_result : ', answer_result)

    gpt_lex = remove_stopwords(answer_result["text"])
    gpt_resp_name = ' '.join(gpt_lex[:3])
    gpt_answer = Answer(name=gpt_resp_name, text=answer_result["text"], dateCreated=datetime.now(), user_id=llm_user["id"], question_id=question["id"])

    db.session.add(gpt_answer)
    db.session.flush()
    db.session.commit()

    return jsonify({"answer": answer_result})

# returns json of question, humans answers
@bp.route("/ask/user/question_text", methods=['POST'])
def ask():
    data = request.json
    question_text = data.get("questionText")
    print('question text: ', question_text)

    # make question name
    filtered_lex = remove_stopwords(question_text)
    question_name = ' '.join(filtered_lex)

    #see if original question exists
    question_schema = QuestionSchema(many=False)
    answers_schema = AnswerSchema(many=True)
    existing = Question.query.filter_by(text=question_text.rstrip('[!?.]')).order_by(desc(Question.dateCreated)).first()
    # print('existing: ', existing)

    return_json = {}
    if existing:
        question_result = question_schema.dump(existing)
        print('existing question json: ', json.dumps(question_result, indent=4))
        answers = existing.answers

        if answers:
            answers_ai = [item for item in answers if item.user_answer.type == "ai"]
            answers_human = [item for item in answers if item.user_answer.type == "human"]
            print("ai answers", answers_ai)
            print("human answers", answers_human)
            answers_ai_result = answers_schema.dump(answers_ai)
            answers_human_result = answers_schema.dump(answers_human)
            return_json["humanAnswers"] = answers_human_result
            return_json["aiAnswers"] = answers_ai_result
    else:
    #     # look for it in gpt, save question and gpt answer
        question = Question(name=question_name, text=question_text, user_id=1, dateCreated=datetime.now())
        db.session.add(question)
        db.session.flush()
        question_result = question_schema.dump(question)

    return_json["question"] = question_result
    #get similar questions
    if filtered_lex:
        fuzzy_str = "%{}%".format('%'.join(filtered_lex))
        print("fuzzy_str: ", fuzzy_str)
        # weird NOT IN query syntax
        similar = (Question.query.filter(Question.text.like(fuzzy_str))
               .filter(~Question.id.in_([question_result["id"]]))
               .order_by(desc(Question.dateCreated)).all())
        questions_schema = QuestionSchema(many=True)
        similar_result = questions_schema.dump(similar)
        print('similar question json: ', json.dumps(similar_result, indent=4))
        return_json["similarQuestions"] = similar_result
    #clean up
    db.session.commit()
    return jsonify(return_json)

@bp.route('/search/question/<int:question_id>')
def search_question(question_id):
    return_json = {}
    question = Question.query.filter_by(id=question_id).first()
    answers = question.answers
    print("search_question question_id: ", question_id, "answers: ", answers)
    answers_schema = AnswerSchema(many=True)

    if answers:
        answers_ai = [item for item in answers if item.user_answer.type == "ai"]
        answers_human = [item for item in answers if item.user_answer.type == "human"]
        print("ai answers", answers_ai)
        print("human answers", answers_human)
        answers_ai_result = answers_schema.dump(answers_ai)
        answers_human_result = answers_schema.dump(answers_human)
        return_json["humanAnswers"] = answers_human_result
        return_json["aiAnswers"] = answers_ai_result

    return jsonify(return_json)



def remove_stopwords(raw_text):
    # Load spaCy English model
    nlp = spacy.load("en_core_web_sm")

    # Process the text using spaCy
    lex = nlp(raw_text)
    filtered_lex = [token.text for token in lex if not token.is_stop]
    return filtered_lex



# @bp.route('/', defaults={'path': ''})
# @bp.route('/<path:path>')
# def serve(path):
#     build_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../frontend/dist')
#     print("Serving from build_dir:", build_dir)
#     if path and os.path.exists(os.path.join(current_app.static_folder, path)):
#         return send_from_directory(current_app.static_folder, path)
#     else:
#         return send_from_directory(current_app.static_folder, 'index.html')


@bp.route('/data/add')
def add_data():
    DataHelper.add_dummy_qa_data()
    return redirect('/')

@bp.route('/data/delete')
def delete_data():
    Question.query.delete()
    Answer.query.delete()
    User.query.delete()
    db.session.commit()
    return redirect('/')

@bp.route('/data/recreate')
def recreate_data():
    db.drop_all()
    db.create_all()
    db.session.commit()
    return redirect('/')
