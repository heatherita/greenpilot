from flask import Flask, Blueprint, request, redirect, jsonify, render_template, send_from_directory, current_app
from openai import OpenAI
from backend.models.data_helper import DataHelper
from backend.models.question import Question
from backend.models.answer import Answer
from backend.models.qa import QuestionAnswer
from backend.models.user import User
from backend.models import db
from dotenv import load_dotenv
import os

# Base.metadata.create_all(bind=engine)
bp = Blueprint("api", __name__)

load_dotenv()  # take environment variables from .env
openai = OpenAI() #magically gets them from environment

@bp.route("/ask", methods=['POST'])
def ask():
    data = request.json
    question_text = data.get("question")

    # db = SessionLocal()
    existing = Question.query.filter_by(text=question_text).first()
    #existing = db.query(QuestionAnswer).filter_by(question=question).first()
    answers = []
    if existing:
        #retrieve existing answer and ask if user would like an ai answer as well?
        answerMaps = QuestionAnswer.query.filter_by(question_id=existing.id).all()
        # print('answers ', *answerMaps, sep='\n')
        for i, qa_data in enumerate(answerMaps):
            # print('qa ', *qa_data, sep='\n')
            answer = Answer.query.filter_by(id=qa_data.answer_id).first()
            answers.append({
                "name": answer.name,
                "text": answer.text,
            })


        # return jsonify({"answer": existing.answer, "source": "cached"})
    else:
        # look for it in gpt, save question and gpt answer
        question = Question(name="a new question", text=question_text)
        db.session.add(question)
        db.session.commit()
    # gpt answer stuff figure out how to use it
    # response = openai.chat.completions.create(
    #      model="gpt-4",
    #      messages=[{"role": "user", "content": question_text}]
    #  )
    # gptanswer = Answer(name="gpt answer", text=response.choices[0].message.content

    # answer = Answer.query.filter_by(id=2).first()
    # return jsonify({"answer": answer, "source": "ai"})
    return jsonify({"answer": answers, "source": "db"})


@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
def serve(path):
    # build_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../frontend/build')
    # print("Serving from build_dir:", build_dir)
    if path and os.path.exists(os.path.join(current_app.static_folder, path)):
        return send_from_directory(current_app.static_folder, path)
    else:
        return send_from_directory(current_app.static_folder, 'index.html')


@bp.route('/data/add')
def add_data():
    DataHelper.add_dummy_qa_data()
    return redirect('/')

@bp.route('/data/delete')
def delete_data():
    Question.query.delete()
    Answer.query.delete()
    QuestionAnswer.query.delete()
    User.query.delete()
    db.session.commit()
    return redirect('/')

@bp.route('/data/recreate')
def recreate_data():
    db.drop_all()
    db.create_all()
    db.session.commit()
    return redirect('/')
