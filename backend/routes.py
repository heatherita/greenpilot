from flask import Flask, Blueprint, request, jsonify
from openai import OpenAI
from models import QuestionAnswer
# from database import SessionLocal, engine, Base
from database import db
from dotenv import load_dotenv

# Base.metadata.create_all(bind=engine)
bp = Blueprint("api", __name__)

load_dotenv()  # take environment variables from .env
openai = OpenAI() #magically gets them from environment

@bp.route("/ask", methods=['POST'])
def ask():
    data = request.json
    question = data.get("question")

    # db = SessionLocal()
    existing = QuestionAnswer.query.filter_by().filter_by(question=question).first()
    # existing = db.query(QuestionAnswer).filter_by(question=question).first()
    if existing:
        return jsonify({"answer": existing.answer, "source": "cached"})

    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question}]
    )
    answer = response.choices[0].message.content

    qa = QuestionAnswer(question=question, answer=answer)
    db.session.add(qa)
    db.session.commit()
    return jsonify({"answer": answer, "source": "ai"})
