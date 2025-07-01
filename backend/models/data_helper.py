# from user import User
from backend.database import db
from backend.models.answer import Answer
from sqlalchemy.orm.exc import NoResultFound
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
        users = []

        # Step 1: add users

        # try:
        # prior_answers = db.session.query(User).filter(User.id == 1).one()
            # Process the result
        # if prior_answers:
        #     print("there are ", prior_answers, " prior answers already")
            # return;
        # except NoResultFound:


        for i, user_data in enumerate(dummy_users):
            myuser = User(firstName=user_data[0], lastName=user_data[1], email=user_data[2])
            db.session.add(myuser)
            users.append(myuser)

        db.session.flush()  # Now users have IDs

        # Step 2: add answers and link to users
        for i, answer_data in enumerate(dummy_answer_items):
            answer = Answer(name=answer_data[0],text=answer_data[1],upvoteCount=answer_data[2],downvoteCount=answer_data[3], author_id=users[answer_data[4]].id)
            db.session.add(answer)
            # firstname, lastname, email = user_data
            # Find which answer(s) this user should belong to
            # for answer_index, (_, _, answer_indices) in enumerate(dummy_answer_items):
            #     if i in user_indices:
            #         user = User(firstname=user_data[0], lastname=user_data[1], email=user_data[2], posting_id=postings[post_index].id)
            #         db.session.add(comment)

        db.session.commit()
