### 실행 준비

```python
!pip install openai
!pip install gradio
```

  
  

### 이전 함수 호출 실습 코드

```python
import gradio as gr
from openai import OpenAI
import json

client = OpenAI()

# 날씨를 조회하는 함수
def get_weather(city):
    return f"{city}의 현재 기온은 10°C이며, 날씨는 맑습니다."

tools = [
  {
      "type": "function",
      "function": {
          "name": "get_weather",
          "description": "지정된 도시에 대해 날씨 정보를 제공하는 함수",
          "parameters": {
              "type": "object",
              "properties": {
                  "city": {
                     "type": "string",
                     "description": "도시",
                  },
              },
              "required": ["city"]
          },
      },
  },
]


# 응답 생성 함수
def generate_response(prompt_text: str):

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
            {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
            {"role": "user", "content": prompt_text}
        ],
        tools=tools,
    )

    response = completion.choices[0].message;

    if response.tool_calls:
        tool_call = response.tool_calls[0]

        arguments = tool_call.function.arguments
        function_name = tool_call.function.name

        arguments_json = json.loads(arguments)

        if function_name == "get_weather":

           city = arguments_json.get('city')
           weather_info = get_weather(city)
           return weather_info

        else:
              return "잘못된 함수입니다."

    elif response.function_call:
        return response.function_call

    else:
        return response.content


# Gradio Blocks 인터페이스 설정
def chatgpt_interface():
    with gr.Blocks() as demo:
        gr.Markdown("### ChatGPT")

        with gr.Row():
            with gr.Column():
                # 사용자 입력 텍스트 박스
                input_text = gr.Textbox(label="문의 사항을 입력해 주세요:")

                # ChatGPT의 응답 출력 텍스트 박스
                output_text = gr.Textbox(label="AI 응답 결과", interactive=False)

                # 버튼 클릭 시, ChatGPT 응답 생성
                input_text.submit(generate_response, inputs=input_text, outputs=output_text)

        demo.launch()

# ChatGPT 인터페이스 실행
chatgpt_interface()
```

  
  

### 도시에 대한 정보를 도시 이름이 아니라 위도와 경도 정보로 받도록 tools 수정

```python
import gradio as gr
from openai import OpenAI
import json

client = OpenAI()


# 날씨를 조회하는 함수
def get_weather(city, lat, lng):
    return f"{lat},{lng} {city}의 현재 기온은 10°C이며, 날씨는 맑습니다."

tools = [
  {
      "type": "function",
      "function": {
          "name": "get_weather",
          "description": "지정된 도시에 대해 날씨 정보를 제공하는 함수",
          "parameters": {
              "type": "object",
              "properties": {
                  "city": {
                     "type": "string",
                     "description": "사용자가 요청한 도시의 이름",
                  },
                  "lat": {
                     "type": "string",
                     "description": "사용자가 요청한 도시의 위도",
                  },
                  "lng": {
                     "type": "string",
                     "description": "사용자가 요청한 도시의 경도",
                  },
              },
              "required": ["city", "lat", "lng"]
          },
      },
  },
]


# 응답 생성 함수
def generate_response(prompt_text: str):

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
            {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
            {"role": "user", "content": prompt_text}
        ],
        tools=tools,
    )

    response = completion.choices[0].message;

    if response.tool_calls:
        tool_call = response.tool_calls[0]

        arguments = tool_call.function.arguments
        function_name = tool_call.function.name

        arguments_json = json.loads(arguments)

        if function_name == "get_weather":

           city = arguments_json.get('city')
           lat = arguments_json.get('lat')
           lng = arguments_json.get('lng')
		   
           weather_info = get_weather(city, lat, lng)
           
           return weather_info

        else:
              return "잘못된 함수입니다."

    elif response.function_call:
        return response.function_call

    else:
        return response.content


# Gradio Blocks 인터페이스 설정
def chatgpt_interface():
    with gr.Blocks() as demo:
        gr.Markdown("### ChatGPT")

        with gr.Row():
            with gr.Column():
                # 사용자 입력 텍스트 박스
                input_text = gr.Textbox(label="문의 사항을 입력해 주세요:")

                # ChatGPT의 응답 출력 텍스트 박스
                output_text = gr.Textbox(label="AI 응답 결과", interactive=False)

                # 버튼 클릭 시, ChatGPT 응답 생성
                input_text.submit(generate_response, inputs=input_text, outputs=output_text)

        demo.launch()

# ChatGPT 인터페이스 실행
chatgpt_interface()
```

  
  

### 날씨 API 코드를 함수에 통합하기

```python
import gradio as gr
from openai import OpenAI
import json

#추가
import requests

client = OpenAI()


# 날씨를 조회하는 함수
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


tools = [
  {
      "type": "function",
      "function": {
          "name": "get_weather",
          "description": "지정된 도시에 대해 날씨 정보를 제공하는 함수",
          "parameters": {
              "type": "object",
              "properties": {
                  "city": {
                     "type": "string",
                     "description": "사용자가 요청한 도시의 이름",
                  },
                  "lat": {
                     "type": "string",
                     "description": "사용자가 요청한 도시의 위도",
                  },
                  "lng": {
                     "type": "string",
                     "description": "사용자가 요청한 도시의 경도",
                  },
              },
              "required": ["city", "lat", "lng"]
          },
      },
  },
]


# 응답 생성 함수
def generate_response(prompt_text: str):

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
            {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
            {"role": "user", "content": prompt_text}
        ],
        tools=tools,
    )

    response = completion.choices[0].message;

    if response.tool_calls:
        tool_call = response.tool_calls[0]

        arguments = tool_call.function.arguments
        function_name = tool_call.function.name

        arguments_json = json.loads(arguments)

        if function_name == "get_weather":

           city = arguments_json.get('city')
           lat = arguments_json.get('lat')
           lng = arguments_json.get('lng')
		   
           weather_info = get_weather(city, lat, lng)

           return weather_info

        else:
              return "잘못된 함수입니다."

    elif response.function_call:
        return response.function_call

    else:
        return response.content


# Gradio Blocks 인터페이스 설정
def chatgpt_interface():
    with gr.Blocks() as demo:
        gr.Markdown("### ChatGPT")

        with gr.Row():
            with gr.Column():
                # 사용자 입력 텍스트 박스
                input_text = gr.Textbox(label="문의 사항을 입력해 주세요:")

                # ChatGPT의 응답 출력 텍스트 박스
                output_text = gr.Textbox(label="AI 응답 결과", interactive=False)

                # 버튼 클릭 시, ChatGPT 응답 생성
                input_text.submit(generate_response, inputs=input_text, outputs=output_text)

        demo.launch()

# ChatGPT 인터페이스 실행
chatgpt_interface()
```