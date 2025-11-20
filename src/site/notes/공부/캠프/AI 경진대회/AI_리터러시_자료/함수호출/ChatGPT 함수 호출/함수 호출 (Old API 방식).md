### 실행 준비

```python
!pip install openai
!pip install gradio
```

  
  

### ChatGPT 기본 템플릿

```python
from openai import OpenAI
import json

client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ]
)

print(completion)

response = completion.choices[0].message;
print(response)

print(response.content)
```

  
  

### Old API 방식의 함수 호출 (Function Calling)

```python
from openai import OpenAI
import json

client = OpenAI()

functions = [
  {
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
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ],
    functions = functions,
)

response = completion.choices[0].message;
print(response)
```