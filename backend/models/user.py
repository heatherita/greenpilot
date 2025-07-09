from datetime import datetime
from sqlalchemy.sql import func
from backend.models import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    # firstName = db.Column(db.String(200))
    # lastName = db.Column(db.String(200))
    fullName = db.Column(db.String(200))
    email = db.Column(db.String(200))
    url = db.Column(db.String(500))
    type = db.Column(db.String(200))
    #dateCreated = db.Column(db.DateTime)
    dateCreated = db.Column(db.DateTime)
    # question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    # answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'))

    questions = db.relationship('Question', back_populates='user_question', cascade="all, delete-orphan")
    answers = db.relationship('Answer', back_populates='user_answer', cascade="all, delete-orphan")
