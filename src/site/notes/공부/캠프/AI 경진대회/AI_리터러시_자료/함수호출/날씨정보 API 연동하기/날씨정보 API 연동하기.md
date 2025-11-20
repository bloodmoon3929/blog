### 날씨 API 생성하기
[[공부/캠프/AI 경진대회/AI_리터러시_자료/함수호출/날씨정보 API 연동하기/AI_Agent_04_날씨_API_생성하기.pdf|AI_Agent_04_날씨_API_생성하기]]

### 실행 준비

```python
!pip install openai
!pip install gradio
```

  
  

### 도시 이름으로 날씨 알아오기

```python
import requests

# 1. API 키와 도시 설정
API_KEY = "3924e8dd1e62418eb9c72516252506"  # 예: '1234567890abcdef'
CITY = "seoul"

# 2. API URL 구성
url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={CITY}&lang=ko"

# 3. API 요청
response = requests.get(url)
data = response.json()

# 4. 데이터 출력
if response.status_code == 200:
    location = data['location']['name']
    country = data['location']['country']
    temp_c = data['current']['temp_c']
    condition = data['current']['condition']['text']
    feelslike = data['current']['feelslike_c']
    humidity = data['current']['humidity']
    wind_kph = data['current']['wind_kph']

    print(f"📍 {location}, {country} 현재 날씨:")
    print(f"- 상태: {condition}")
    print(f"- 기온: {temp_c}°C (체감온도: {feelslike}°C)")
    print(f"- 습도: {humidity}%")
    print(f"- 풍속: {wind_kph} km/h")
else:
    print("⛔ 날씨 정보를 불러올 수 없습니다.")
    print("오류 코드:", response.status_code)
```

  
  

### 위도와 경도 정보로 날씨 알아오기

```python
import requests

# 1. API 키와 도시 설정
API_KEY = "3924e8dd1e62418eb9c72516252506"  # 예: '1234567890abcdef'
CITY = "35.1595,126.8526"

# 2. API URL 구성
url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={CITY}&lang=ko"

# 3. API 요청
response = requests.get(url)
data = response.json()

# 4. 데이터 출력
if response.status_code == 200:
    location = data['location']['name']
    country = data['location']['country']
    temp_c = data['current']['temp_c']
    condition = data['current']['condition']['text']
    feelslike = data['current']['feelslike_c']
    humidity = data['current']['humidity']
    wind_kph = data['current']['wind_kph']

    print(f"📍 {location}, {country} 현재 날씨:")
    print(f"- 상태: {condition}")
    print(f"- 기온: {temp_c}°C (체감온도: {feelslike}°C)")
    print(f"- 습도: {humidity}%")
    print(f"- 풍속: {wind_kph} km/h")
else:
    print("⛔ 날씨 정보를 불러올 수 없습니다.")
    print("오류 코드:", response.status_code)
```

  
  

### 날씨 정보를 문자열로 정리하기

```python
import requests

# 1. API 키와 도시 설정
API_KEY = "3924e8dd1e62418eb9c72516252506"
CITY = "35.1595,126.8526"

# 2. API URL 구성
url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={CITY}&lang=ko"

# 3. API 요청
response = requests.get(url)
data = response.json()


weather = ""


# 4. 데이터 출력
if response.status_code == 200:
    location = data['location']['name']
    country = data['location']['country']
    temp_c = data['current']['temp_c']
    condition = data['current']['condition']['text']
    feelslike = data['current']['feelslike_c']
    humidity = data['current']['humidity']
    wind_kph = data['current']['wind_kph']
	
	
    weather = f"📍 {location}, {country} 현재 날씨:\n"
    weather += f"- 상태: {condition}\n"
    weather += f"- 기온: {temp_c}°C (체감온도: {feelslike}°C)\n"
    weather += f"- 습도: {humidity}%\n"
    weather += f"- 풍속: {wind_kph} km/h"
    
else:
    weather = "⛔ 날씨 정보를 불러올 수 없습니다.\n"
    weather += "오류 코드:", response.status_code	
	
print(weather)	
```

  
  

### 날씨 정보를 리턴하는 함수 만들기

```python
import requests

def get_weather(city, lat, lng):

    # 1. API 키와 도시 설정
    API_KEY = "3924e8dd1e62418eb9c72516252506"
    CITY = f"{lat},{lng}"

    # 2. API URL 구성
    url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={CITY}&lang=ko"

    # 3. API 요청
    response = requests.get(url)
    data = response.json()

    weather = ""

    # 4. 데이터 출력
    if response.status_code == 200:
        location = data['location']['name']
        country = data['location']['country']
        temp_c = data['current']['temp_c']
        condition = data['current']['condition']['text']
        feelslike = data['current']['feelslike_c']
        humidity = data['current']['humidity']
        wind_kph = data['current']['wind_kph']
            
        weather = f"📍 {city}의 현재 날씨입니다.\n"
        weather += f"- 상태: {condition}\n"
        weather += f"- 기온: {temp_c}°C (체감온도: {feelslike}°C)\n"
        weather += f"- 습도: {humidity}%\n"
        weather += f"- 풍속: {wind_kph} km/h"
        
    else:
        weather = "⛔ 날씨 정보를 불러올 수 없습니다.\n"
        weather += "오류 코드:", response.status_code	
      
    return weather


weather =  get_weather('서울', "35.1595", "126.8526")

print(weather)
```