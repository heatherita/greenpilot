from dataclasses import dataclass, field
from datetime import datetime
# from sqlalchemy.sql import func
from backend.models import db


class QuestionAnswer(db.Model):
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'))
