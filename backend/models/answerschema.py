from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from backend.models.answer import Answer


class AnswerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Answer
        include_relationships = True
        load_instance = True
