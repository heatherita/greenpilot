# from sqlalchemy import Column, Integer, String, Text,SQLAlchemy
# from database import Base
from database import db

class QuestionAnswer(db.Model):
    __tablename__ = "qa"
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, unique=True)
    answer = db.Column(db.Text)