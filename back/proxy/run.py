from flask import Flask, request
from apis import p3_riot

app = Flask(__name__)


@app.route("/riot/<name>", methods=["GET"])
def riot_service(name):
  return p3_riot.riot(name)

@app.route("/riot/updateKey", methods=["POST"])
def update_key_service():
  key = request.args.get("token")
  password = request.args.get("password")
  return p3_riot.update_key(key, password)

if __name__ == "__main__":
  app.run("0.0.0.0", port=5000, debug=True)
