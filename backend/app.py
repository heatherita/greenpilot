from flask import Flask

# from backend.models.data_helper import DataHelper
from backend.models import db
from flask_cors import CORS

# db = SQLAlchemy()

def create_app():
    app = Flask(
        __name__,
        static_folder='../frontend/build',  # path relative to app.py
        static_url_path='/'
    )
    # app = Flask(__name__),
    # static_folder = '../frontend/build',  # path relative to app.py
    # static_url_path = '/'
    app.config.from_object('config.Config')
    print('sqlalchemy key: ', app.config['SQLALCHEMY_DATABASE_URI'])
    db.init_app(app)


    CORS(app)

    with app.app_context():
        from backend.models import user, question, answer, qa

        db.drop_all()
        db.create_all()
        # DataHelper.add_dummy_qa_data()

    from backend.routes import bp as api_routes
    app.register_blueprint(api_routes)

    return app


if __name__ == "__main__":
        app = create_app()
        app.run(debug=True)
        #app.run(host="0.0.0.0", port=5000, debug=True)


