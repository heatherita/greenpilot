from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


# from sqlalchemy.sql import func
from backend.models import db

@dataclass
class Answer(db.Model):
    __tablename__ = 'answer'
    id: int
    name: str
    text: str
    upvoteCount: int
    downvoteCount: int
    dateCreated: datetime
    # Add a 'comments' field that is serializable
    author_id: Optional[str] = field(default=None)


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    text = db.Column(db.Text)
    upvoteCount = db.Column(db.Integer)
    downvoteCount = db.Column(db.Integer)
    # author = db.relationship('User', backref='question', cascade="all, delete-orphan")
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    dateCreated = db.Column(db.DateTime)
    # dateCreated = db.Column(db.DateTime, default=func.now())

