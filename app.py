from flask import Flask
from flask_restful import Api

from api.urls import init_api_urls

app = Flask(__name__)
api = Api(app)


init_api_urls(api)


if __name__ == '__main__':
    app.run()
