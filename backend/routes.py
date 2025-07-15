from datetime import datetime

from flask import Flask, Blueprint, request, redirect, jsonify, render_template, send_from_directory, current_app
from openai import OpenAI
from spacy.vocab import is_stop
from sqlalchemy.orm import joinedload
from backend.models.data_helper import DataHelper
from backend.models.question import Question
from backend.models.answer import Answer
from backend.models.questionschema import QuestionSchema
from backend.models.user import User
from backend.models import db
from dotenv import load_dotenv
import spacy
import os
import json

# Base.metadata.create_all(bind=engine)
bp = Blueprint("api", __name__)

load_dotenv()  # take environment variables from .env
openai = OpenAI() #magically gets them from environment

# returns json of question, ai answers
# @bp.route("/askai", methods=['POST'])
# def ask_ai():
#     data = request.json
#     question_text = data.get("question")
#
#     # Load spaCy English model
#     nlp = spacy.load("en_core_web_sm")
#
#     # Process the text using spaCy
#     lex = nlp(question_text)
#     filtered_lex = [token.text for token in lex if not not token.is_stop]
#     question_name = ' '.join(filtered_lex)
#     existing = Question.query.filter_by(text=question_text).first()
#
#     answers = []
#     # look for it in gpt, save question and gpt answer
#     question = Question(name=question_name, text=question_text, author_id=1, dateCreated=datetime.now())
#     db.session.add(question)
#     db.session.flush()
#     # db.session.commit()
#     # gpt answer stuff figure out how to use it
#     response = openai.chat.completions.create(
#         model="gpt-4",
#         messages=[{"role": "user", "content": question_text}]
#     )
#     gpt_resp = response.choices[0].message.content
#     gpt_lex = nlp(gpt_resp)
#     filtered_gpt_lex = [token.text for token in gpt_lex if not not token.is_stop]
#     gpt_resp_name = ' '.join(filtered_gpt_lex[:3])
#     gpt_answer = Answer(name=gpt_resp_name, text=gpt_resp, source="ai", author_id=3)
#     db.session.add(gpt_answer)
#     # db.session.flush()
#     db.session.commit()
#
#     aiAnswerMaps = QuestionAnswer.query.filter_by(question_id=question.id).all()
#     for i, qa_data in enumerate(aiAnswerMaps):
#         # print('qa ', *qa_data, sep='\n')
#         answer = Answer.query.filter_by(id=qa_data.answer_id).first()
#         answers.append({
#             "name": answer.name,
#             "text": answer.text,
#             "dateCreated":answer.dateCreated
#         })
#     # answer = Answer.query.filter_by(id=2).first()
#
#     return jsonify({"answer": answers})

# returns json of question, humans answers
@bp.route("/questions/search", methods=['POST'])
def ask():
    data = request.json
    question_text = data.get("questionText")
    print('question text: ', question_text)
    # Load spaCy English model
    nlp = spacy.load("en_core_web_sm")

    # Process the text using spaCy
    lex = nlp(question_text)
    filtered_lex = [token.text for token in lex if not token.is_stop]
    question_name = ' '.join(filtered_lex)

    existing = Question.query.filter_by(text=question_text).first()
    # print('existing: ', existing)

    fuzzy_str = '%'.join(filtered_lex)
    fuzzy_str = "%{}%".format(fuzzy_str)
    print("fuzzy_str: ",fuzzy_str)
    similar = Question.query.filter(Question.text.like(fuzzy_str)).all()
    single_schema = QuestionSchema(many=False)
    many_schema = QuestionSchema(many=True)
    similar_result = many_schema.dump(similar)
    if existing:
        question_result = single_schema.dump(existing)
        print('single question json: ', json.dumps(question_result, indent=4))
        print('single question json: ', json.dumps(similar_result, indent=4))
    else:
    #     # look for it in gpt, save question and gpt answer
        question = Question(name=question_name, text=question_text, user_id=1, dateCreated=datetime.now())
        db.session.add(question)
        db.session.flush()
        question_result = single_schema.dump(question)
        db.session.commit()

    return jsonify({ "question": question_result, "similarQuestions": similar_result })




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
