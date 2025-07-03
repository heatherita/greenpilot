# from user import User
from backend.models import db
from backend.models.answer import Answer
from backend.models.qa import QuestionAnswer
from backend.models.question import Question
# from sqlalchemy.orm.exc import NoResultFound
# from answer import Answer
from backend.models.user import User


class DataHelper:
    @staticmethod
    def add_dummy_qa_data():
        dummy_users = [
            ['heather','propes','hbuch4@yahoo.com',''],
            ['george','moore','gmoore@gmail.com',''],
            ['randy','jones','randyj@yahoo.com','']
        ]

        dummy_question_items = [
            ['tree size', 'how big is a tree',0],
            ['esprit t-shirt', 'when was the first esprit logo t-shirt released?' ,2],
            ['name origin', 'what is the origin of the name Achebe', 1]
        ]

        dummy_answer_items = [
            ['tree small', 'its pretty big', 1,0,1],
            ['tree other', 'its bigger than a loaf of bread',1,0,2],
            ['t-shirt well', 'well well well',1,0, 2],
            ['t-shirt date', 'it was in 1984',1,1, 2],
            ['name origin', 'Achebe(Nigerian origin) meaning the goddess protects from the Igbo people of Nigeria.',2,1,1]
        ]

        dummy_qa_items = [
            [0,0],
            [0,1],
            [1,2],
            [1,3],
            [2,4],
            ]
        users = []
        questions = []
        answers = []

        # Step 1: add users
        for i, user_data in enumerate(dummy_users):
            myuser = User(firstName=user_data[0], lastName=user_data[1], email=user_data[2])
            db.session.add(myuser)
            users.append(myuser)

        db.session.flush()  # Now users have IDs

        # Step 2: add answers and link to users
        for i, answer_data in enumerate(dummy_answer_items):
            answer = Answer(name=answer_data[0],text=answer_data[1],upvoteCount=answer_data[2],downvoteCount=answer_data[3], author_id=users[answer_data[4]].id)
            db.session.add(answer)
            answers.append(answer)

        db.session.flush()  # Now users have IDs

        # Step 3: add questions and link to users
        for i, question_data in enumerate(dummy_question_items):
            question = Question(name=question_data[0], text=question_data[1], author_id=users[question_data[2]].id)
            db.session.add(question)
            questions.append(question)

        db.session.flush()  # Now users have IDs

        # Step 4: add qa mappings
        for i, qa_data in enumerate(dummy_qa_items):
            qa = QuestionAnswer(question_id=questions[qa_data[0]].id, answer_id=answers[qa_data[1]].id)
            db.session.add(qa)


        db.session.commit()
