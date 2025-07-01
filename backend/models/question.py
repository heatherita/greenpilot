from dataclasses import dataclass, field
from datetime import datetime
from sqlalchemy.sql import func
from backend.database import db


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # answerCount = db.Column(db.Integer)
    name = db.Column(db.String(200))
    text = db.Column(db.Text)
    # answers = db.Column(db.Integer, db.ForeignKey('user.id'))
    # author = db.relationship('User', backref='question', cascade="all, delete-orphan")
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # acceptedAnswer = db.relationship('Answer', backref='question', cascade="all, delete-orphan")
    # suggestedAnswer = db.relationship('Answer', backref='question', cascade="all, delete-orphan")
    dateCreated = db.Column(db.DateTime)
    # dateCreated = db.Column(db.DateTime, default=func.now())
