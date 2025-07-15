from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

from backend.models.answer import Answer
from backend.models.question import Question
from backend.models.user import User



class UserSchema(SQLAlchemyAutoSchema):
    answers = fields.Nested(lambda: AnswerSchema(), many=True)
    questions = fields.Nested(lambda: QuestionSchema(), many=True)

    class Meta:
        model = User
        include_relationships = True
        load_instance = True

class QuestionSchema(SQLAlchemyAutoSchema):
    answers = fields.Nested(lambda: AnswerSchema(), many=True)
    user_question = fields.Nested(lambda: UserSchema(exclude=("questions","answers"),only=("id","fullName","type","url")), many=False)

    class Meta:
        model = Question
        include_relationships = True
        load_instance = True

class AnswerSchema(SQLAlchemyAutoSchema):
    user_answer = fields.Nested(lambda: UserSchema(exclude=("answers","questions"),only=("id","fullName","type","url")), many=False)

    class Meta:
        model = Answer
        include_relationships = True
        load_instance = True
