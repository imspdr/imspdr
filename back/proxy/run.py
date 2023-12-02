from flask import Flask
from apis.p3_riot import p3_riot

app = Flask(__name__)
app.register_blueprint(p3_riot)

@app.route("/")
def index():
    return "hello imspdr"

