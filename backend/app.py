from flask import Flask
from database import db
from flask_cors import CORS

# db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)

    # print('openai api key: ', app.config['OPENAI_API_KEY'])
    CORS(app)

    from routes import bp as api_routes
    app.register_blueprint(api_routes)

    with app.app_context():
        #       db.drop_all()
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
