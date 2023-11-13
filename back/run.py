from flask import Flask, request
import requests

app = Flask(__name__)


RIOTKEY = "RGAPI-a25f796f-0a79-4843-83ca-2d6c89297fed"


@app.route("/")
def home():
  return "This is home!"


@app.route("/riot/<name>", methods=["GET"])
def riot(name):
  global RIOTKEY

  url_kr = "https://kr.api.riotgames.com/"
  url_asia = "https://asia.api.riotgames.com/"
  
  summoner = "lol/summoner/v4/summoners/by-name/"
  matchs = "lol/match/v5/matches/by-puuid/"
  match_info = "lol/match/v5/matches/"
  champ_top = "lol/champion-mastery/v4/champion-masteries/by-puuid/"

  header = {"X-Riot-Token" : RIOTKEY}

  # puuid 찾기
  try:
    puuid = requests.get(url_kr + summoner + name, headers=header).json()["puuid"]
  except KeyError:
    puuid = "error"

  # 최근 전적 id 찾기
  if puuid != "error":
    matchList = requests.get(url_asia + matchs + puuid + "/ids", headers=header).json()
  else:
    matchList = []

  # 최근 전적 정보 찾기
  match_info_list = []
  for match in matchList:
    try:
      ret = requests.get(url_asia + match_info + match, headers=header).json()
      participants = ret["info"]["participants"]
      his_result = {}
      for participant in participants:
        if puuid == participant["puuid"]:
          his_result = participant
          break
      ret_his_result = {
        "championName": his_result["championName"],
        "kill": his_result["kills"],
        "death": his_result["deaths"],
        "assist": his_result["assists"],
        "win": 1 if his_result["win"] else 0
      }
      match_info_list.append(ret_his_result)
    except KeyError:
      match_info_list.append({
        "championName":"error",
        "kill": 0,
        "death": 0,
        "assist": 0,
        "win": 0
      });

  # 모스트 찾기
  mosts = []
  try:
    ret = requests.get(url_kr + champ_top + puuid+"/top?count=5", headers=header).json()
    print(ret)
    for re in ret:
      mosts.append({
        "champ": re["championId"],
        "point": re["championPoints"]
      })
  except KeyError:
    mosts = []  

  return {"id": puuid, "name": name,"lastGames": match_info_list, "mosts": mosts}


if __name__ == "__main__":
  app.run("0.0.0.0", port=5000, debug=True)
