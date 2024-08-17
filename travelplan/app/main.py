from fastapi import FastAPI, HTTPException, Query
import requests
from datetime import datetime
import os

app = FastAPI()

# 동적으로 환경 변수에서 API 키 가져오기
API_KEY = os.getenv("WEATHER_API_KEY", "C0P5uHN2AgSUtpQedKDEFLDGyJANoWKsRUDDDypPy6t6NACzgaUALXRIQSbaqKYBwcn6G%2B14pZh%2BR2H6zgAKEw%3D%3D")

@app.get("/weather/")
async def get_weather(
    location: str,
    base_date: str = Query(None),  # 기본값을 None으로 설정하고 동적으로 처리
    base_time: str = Query(None),
    nx: int = 55,
    ny: int = 127
):
    if not base_date:
        base_date = datetime.now().strftime("%Y%m%d")  # 현재 날짜로 기본값 설정
    if not base_time:
        base_time = "0630"  # 기본값 설정

    # 기상청 API URL
    url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"

    # 기상청 API 요청 파라미터 설정
    params = {
        "serviceKey": API_KEY,
        "pageNo": "1",
        "numOfRows": "1000",
        "dataType": "JSON",  # JSON 형식으로 요청
        "base_date": base_date,
        "base_time": base_time,
        "nx": nx,
        "ny": ny
    }

    # 실제 API 호출
    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Weather API request failed")

    # JSON 데이터 파싱
    data = response.json()
    if "response" in data and "body" in data["response"]:
        return data["response"]["body"]["items"]
    else:
        raise HTTPException(status_code=500, detail="Invalid API response")
