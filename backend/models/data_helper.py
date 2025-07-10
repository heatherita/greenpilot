from datetime import datetime
from backend.models import db
from backend.models.answer import Answer
from backend.models.question import Question
from backend.models.user import User


class DataHelper:
    @staticmethod
    def add_dummy_qa_data():
        dummy_users = [
            {'fullName': 'heather propes', 'email': 'hbuch4@yahoo.com', 'type':'human'},
            {'fullName': 'george robinson', 'email': 'grobinson@gmail.com', 'type': 'human'},
            {'fullName': 'randy jones', 'email': 'randyj@yahoo.com', 'type': 'human'},
            {'fullName': 'GPT-4', 'url': 'openai.com', 'type': 'ai'}
        ]

        dummy_question_items = [
            {'name':'tree size', 'text':'how big is a tree','user_id':1},
            {'name':'esprit t-shirt', 'text':'when was the first esprit logo t-shirt released?', 'user_id':3},
            {'name':'name origin', 'text':'what is the origin of the name Achebe', 'user_id':2 }
        ]

        dummy_answer_items = [
            {'name':'tree small', 'text':'its pretty big','upvoteCount':4,'downvoteCount':2,'user_id':1,'question_id':1},
            {'name':'tree other', 'text':'its bigger than a loaf of bread','upvoteCount':3,'downvoteCount':1,'user_id':1,'question_id':1},
            {'name':'t-shirt well', 'text':'well well well','upvoteCount':3,'downvoteCount':1,'user_id':2,'question_id':2},
            {'name':'t-shirt date', 'text':'it was in 1984','upvoteCount':1,'downvoteCount':2,'user_id':2,'question_id':2},
            {'name':'name origin', 'text':'Achebe(Nigerian origin) meaning the goddess protects from the Igbo people of Nigeria','upvoteCount':2,'downvoteCount':3,'user_id':3,'question_id':3},
        ]

        users = []
        questions = []
        answers = []

        # Step 1: add users
        for i, user_data in enumerate(dummy_users):
            myuser = User(fullName=user_data.get('fullName'), email=user_data.get('email',''), url=user_data.get('url',''), type=user_data.get('type',''), dateCreated=datetime.now())
            db.session.add(myuser)
            users.append(myuser)

        db.session.flush()  # Now users have IDs

        # Step 2: add answers and link to users
        for i, answer_data in enumerate(dummy_answer_items):
            answer = Answer(name=answer_data.get('name'),
                            text=answer_data.get('text'),
                            upvoteCount=answer_data.get('upvoteCount'),
                            downvoteCount=answer_data.get('downvoteCount'),
                            user_id=users[answer_data.get('user_id')].id,
                            question_id=answer_data.get('question_id'),
                            dateCreated=datetime.now())
            db.session.add(answer)
            answers.append(answer)

        db.session.flush()  # Now users have IDs

        # Step 3: add questions and link to users
        for i, question_data in enumerate(dummy_question_items):
            question = Question(name=question_data.get('name'),
                                text=question_data.get('text'),
                                user_id=users[question_data.get('user_id')].id,
                                dateCreated=datetime.now())
            db.session.add(question)
            questions.append(question)

        db.session.flush()  # Now users have IDs

        db.session.commit()
