from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from backend.models.user import User
from backend.models.answerschema import AnswerSchema
from backend.models.questionschema import QuestionSchema


class UserSchema(SQLAlchemyAutoSchema):
    answers = fields.Nested(AnswerSchema, many=True)
    questions = fields.Nested(QuestionSchema, many=True)

    class Meta:
        model = User
        include_relationships = True
        load_instance = True
