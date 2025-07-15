from datetime import datetime
from backend.models import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(200))
    email = db.Column(db.String(200))
    url = db.Column(db.String(500))
    type = db.Column(db.String(200))
    dateCreated = db.Column(db.DateTime)

    questions = db.relationship('Question', back_populates='user_question', cascade="all, delete-orphan")
    answers = db.relationship('Answer', back_populates='user_answer', cascade="all, delete-orphan")
