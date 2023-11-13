from flask import Flask, request
import requests

app = Flask(__name__)


RIOTKEY = "RGAPI-f54999ef-ecd9-4c80-bc1e-02670624a813"

@app.route("/")
def home():
  return "This is home!"


@app.route("/riot/<name>", methods=["GET"])
def riot(name):
  global RIOTKEY
  baseurl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
  ret = requests.get(baseurl + name + "/?api_key=" + RIOTKEY)
  print(ret)
  return {"puuid": ret["puuid"]}


if __name__ == "__main__":
  app.run("0.0.0.0", port=5000, debug=True)
