from backend.models import db
from backend.models.answer import Answer


class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    text = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    dateCreated = db.Column(db.DateTime)
    user_question = db.relationship('User', back_populates='questions')
    answers = db.relationship("Answer", back_populates="question",order_by=Answer.upvoteCount.desc())