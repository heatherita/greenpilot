from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from backend.models.answerschema import AnswerSchema
from backend.models.question import Question


class QuestionSchema(SQLAlchemyAutoSchema):
    answers = fields.Nested(AnswerSchema, many=True)

    class Meta:
        model = Question
        include_relationships = True
        load_instance = True
