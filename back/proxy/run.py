from flask import Flask
from apis.p3_riot import p3_riot

app = Flask(__name__)
app.register_blueprint(p3_riot)

@app.route("/")
def index():
    return "hello imspdr"

if __name__ == "__main__":
    app.run(port=5000, debug=True)
