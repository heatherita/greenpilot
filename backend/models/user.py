from sqlalchemy.sql import func
from backend.models import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(200))
    lastName = db.Column(db.String(200))
    email = db.Column(db.String(200))
    url = db.Column(db.String(500))
    #dateCreated = db.Column(db.DateTime)
    dateCreated = db.Column(db.DateTime, default=func.now())
