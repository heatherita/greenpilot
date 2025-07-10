# from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from backend.models import db


# @dataclass
class Answer(db.Model):
    __tablename__ = 'answer'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    text = db.Column(db.Text)
    upvoteCount = db.Column(db.Integer, default=0)
    downvoteCount = db.Column(db.Integer, default=0)
    # author = db.relationship('User', backref='question', cascade="all, delete-orphan")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_answer = db.relationship('User', back_populates='answers')

    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    question = db.relationship("Question", back_populates="answers")
    dateCreated = db.Column(db.DateTime)

    @property
    def net_votes(self):
        return (self.upvoteCount or 0) - (self.downvoteCount or 0)

