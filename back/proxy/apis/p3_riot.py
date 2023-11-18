import requests

RIOTKEY = "RGAPI-72e763f4-0992-4114-baf6-69ca40311016"

def update_key(key, password):
  global RIOTKEY

  print(key)
  print(password)
  if password == "updatetoken":
    RIOTKEY = key;
    return {
      "status": "success",
      "data": "0"
    }
  else:
    return {
      "status": "error",
      "data": "0"
    }

def riot(name):
  global RIOTKEY

  url_kr = "https://kr.api.riotgames.com/"
  url_asia = "https://asia.api.riotgames.com/"
  
  summoner = "lol/summoner/v4/summoners/by-name/"
  matchs = "lol/match/v5/matches/by-puuid/"
  match_info = "lol/match/v5/matches/"
  champ_top = "lol/champion-mastery/v4/champion-masteries/by-puuid/"
  find_tier = "lol/league/v4/entries/by-summoner/"

  header = {"X-Riot-Token" : RIOTKEY}

  # puuid 찾기
  try:
    summoner_response = requests.get(url_kr + summoner + name, headers=header).json()
    puuid = summoner_response["puuid"]
    userid = summoner_response["id"]
  except KeyError:
    return {
      "status": "error",
      "data": "0"
    }
  except TypeError:
    return {
      "status": "error",
      "data": "0"
    }

  # 최근 전적 id 찾기
  try:
    matchList = requests.get(url_asia + matchs + puuid + "/ids", headers=header).json()
  except KeyError:
    return {
      "status": "error",
      "data": "0"
    }
  except TypeError:
    return {
      "status": "error",
      "data": "0"
    }

  # 유저 티어 찾기
  try:
    tierList = requests.get(url_kr + find_tier + userid, headers=header).json()
  except KeyError:
    return {
      "status": "error",
      "data": "0"
    }
  except TypeError:
    return {
      "status": "error",
      "data": "0"
    }
  
  # 최근 전적 정보 찾기
  match_info_list = []
  for match in matchList[:10]:
    try:
      ret = requests.get(url_asia + match_info + match, headers=header).json()
      participants = ret["info"]["participants"]
      ret_participants = []
      his_result = {}
      for participant in participants:
        ret_participants.append({
          "championName": participant["championName"],
          "kill": participant["kills"],
          "death": participant["deaths"],
          "assist": participant["assists"],
          "win": 1 if participant["win"] else 0,
          "name": participant["summonerName"],
          "deal": participant["totalDamageDealtToChampions"]
        })
        if puuid == participant["puuid"]:
          his_result = participant
      ret_his_result = {
        "championName": his_result["championName"],
        "kill": his_result["kills"],
        "death": his_result["deaths"],
        "assist": his_result["assists"],
        "win": 1 if his_result["win"] else 0
      }
      match_info_list.append({
        "myPlay": ret_his_result,
        "participants": ret_participants
      })
    except KeyError:
      return {
        "status": "error",
        "data": "0"
      }
    except TypeError:
      return {
        "status": "error",
        "data": "0"
      }

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
    return {
      "status": "error",
      "data": "0"
    }
  except TypeError:
    return {
      "status": "error",
      "data": "0"
    }

  return {"status": "success", "data": {"id": puuid, "name": name,"lastGames": match_info_list, "mosts": mosts, "tierList": tierList}}