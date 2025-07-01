from dataclasses import dataclass, field
from datetime import datetime
from sqlalchemy.sql import func
from backend.database import db


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    text = db.Column(db.Text)
    upvoteCount = db.Column(db.Integer)
    downvoteCount = db.Column(db.Integer)
    # author = db.relationship('User', backref='question', cascade="all, delete-orphan")
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    dateCreated = db.Column(db.DateTime)
    # dateCreated = db.Column(db.DateTime, default=func.now())

