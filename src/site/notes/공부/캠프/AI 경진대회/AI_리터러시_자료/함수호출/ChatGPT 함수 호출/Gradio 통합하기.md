### 실행 준비

```python
!pip install openai
!pip install gradio
```

  
  

### Gradio 템플릿

```python
import gradio as gr
from openai import OpenAI
import json

client = OpenAI()

# 응답 생성 함수
def generate_response(prompt_text: str):

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "친절한 상담원 역할을 해줘."},
            {"role": "user", "content": prompt_text}
        ]
    )

    response = completion.choices[0].message;
    return response.content


# Gradio Blocks 인터페이스 설정
def chatgpt_interface():
    with gr.Blocks() as demo:
        gr.Markdown("### My ChatGPT")

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

  
  

### 함수 호출 정의 내용 추가하기

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

  
  

### Tool 호출 실행 통합하기

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