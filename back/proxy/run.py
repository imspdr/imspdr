from flask import Flask, request
from apis import p3_riot

app = Flask(__name__)

############## RIOT APIS ##################################################

@app.route("/riot/puuid/<name>", methods=["GET"])
def get_puuid(name):
  return p3_riot.get_puuid(name)

@app.route("/riot/matchIds/<puuid>/<start>/<count>", methods=["GET"])
def get_match_ids(puuid, start, count):
  return p3_riot.get_match_ids(puuid, start, count)

@app.route("/riot/tier/<userid>", methods=["GET"])
def get_user_tier(userid):
  return p3_riot.get_user_tier(userid)

@app.route("/riot/match/<matchid>", methods=["GET"])
def get_match_info(matchid):
  return p3_riot.get_match_info(matchid)

@app.route("/riot/most/<puuid>", methods=["GET"])
def get_most(puuid):
  return p3_riot.get_most(puuid)

@app.route("/riot/updateKey", methods=["POST"])
def update_key_service():
  key = request.args.get("token")
  password = request.args.get("password")
  return p3_riot.update_key(key, password)

##############################################################################

if __name__ == "__main__":
  app.run("0.0.0.0", port=5000, debug=True)
