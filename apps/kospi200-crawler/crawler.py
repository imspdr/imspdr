from crawl_stock_data import crawl_stock_data
from crawl_kospi200 import crawl_kospi200
from build_analysis import analysis_df, is_buy_signal
import os
import json
import time

if __name__ == "__main__":

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    store_path = os.path.join(BASE_DIR, "../../apps/kospi200/public/data/")
    os.makedirs(store_path, exist_ok=True)

    codes_filename = "codes.json"
    kospi200 = crawl_kospi200()
    codes_with_to_buy = []

    for i, stock in enumerate(kospi200):
        time.sleep(1)
        code = stock["code"]
        filename = f"data{code}.json"
        try:
            with open(os.path.join(store_path, filename), "r") as f:
                cached_data = json.load(f)
        except Exception:
            cached_data = None

        print(f"{i}" + stock["name"])
        if cached_data:
            new_data = crawl_stock_data(stock["code"], 2)
            old_analysis = cached_data["analysis"]
            
            # Using a set of dates for faster lookup
            cached_dates = {item["date"] for item in old_analysis}
            for item in new_data:
                if item["date"] not in cached_dates:
                    old_analysis.append(item)
            
            # Sort by date and keep latest
            old_analysis.sort(key=lambda x: x["date"])
            analysis = analysis_df(old_analysis[-520:])
        else:
            # First time crawl: 2 years (approx 52 pages of 10 days each = 520 days)
            data = crawl_stock_data(stock["code"], 52)
            analysis = analysis_df(data)

        # news = crawl_news(stock["name"])
        news = []
        to_buy = is_buy_signal(analysis[-1])

        last_result = {
            "code": stock["code"],
            "name": stock["name"].replace("amp;", ""),
            "analysis": analysis,
            "news": news,
            "to_buy": to_buy
        }
        codes_with_to_buy.append({
            "code": stock["code"],
            "name": stock["name"].replace("amp;", ""),
            "to_buy": to_buy,
            "today": analysis[-1]["end"],
            "last": analysis[-2]["end"]
        })
        with open(os.path.join(store_path, filename), "w", encoding="utf-8") as f:
            json.dump(last_result, f, ensure_ascii=False, indent=4)


    with open(os.path.join(store_path, codes_filename), "w", encoding="utf-8") as f:
        json.dump(codes_with_to_buy, f, ensure_ascii=False, indent=4)