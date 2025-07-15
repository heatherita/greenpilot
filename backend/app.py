from flask import Flask, send_from_directory
from backend.models import db
from flask_cors import CORS
import os

def create_app():
    app = Flask(
        __name__,
        static_folder='../frontend/dist',  # path relative to app.py
        static_url_path='/'
    )
    # app = Flask(__name__)
    app.config.from_object('config.Config')
    print('sqlalchemy key: ', app.config['SQLALCHEMY_DATABASE_URI'])
    db.init_app(app)


    CORS(app)

    with app.app_context():
        from backend.models import user, question, answer
        # db.drop_all()
        db.create_all()

    from backend.routes import bp as api_routes
    app.register_blueprint(api_routes)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        dist_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../frontend/dist')
        print("Serving from dist_dir:", dist_dir)
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app


if __name__ == "__main__":
        app = create_app()
        app.run(debug=True)
        #app.run(host="0.0.0.0", port=5000, debug=True)


