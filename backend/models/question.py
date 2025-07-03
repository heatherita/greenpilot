from sqlalchemy.sql import func
from backend.models import db


class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    text = db.Column(db.Text)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #dateCreated = db.Column(db.DateTime)
    dateCreated = db.Column(db.DateTime, default=func.now())
