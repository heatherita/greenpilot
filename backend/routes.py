from flask import Flask, Blueprint, request, redirect, jsonify, render_template, send_from_directory, current_app
from openai import OpenAI
from backend.models.data_helper import DataHelper
from backend.models.question import Question
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
    existing = Question.query.filter_by().filter_by(text=question_text).first()
    #existing = db.query(QuestionAnswer).filter_by(question=question).first()
    if existing:
        return jsonify({"answer": existing.answer, "source": "cached"})

    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question_text}]
    )
    answer = response.choices[0].message.content

    question = Question(name="a new question", text=question_text)
    db.session.add(question)
    db.session.commit()
    return jsonify({"answer": answer, "source": "ai"})

# @bp.route('/')
# def index():
#     return render_template('index.html')


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
