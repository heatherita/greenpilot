from sqlalchemy import PrimaryKeyConstraint
from backend.models import db


class QuestionAnswer(db.Model):
    __tablename__ = 'qa'
    __table_args__ = (
        PrimaryKeyConstraint('question_id', 'answer_id'),
    )

    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'))
    dateCreated = db.Column(db.DateTime)
