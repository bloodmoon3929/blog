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

  
  

### 최신 API에서의 함수 호출 방식

```python
from openai import OpenAI
import json

client = OpenAI()

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
  }
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;
print(response)
```

  
  

### 일반적인 질문 테스트

```python
from openai import OpenAI
import json

client = OpenAI()

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
  }
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "user", "content": "서울의 맛집 3개를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;
print(response)
```

  
  

### 일반적인 질문을 확실하게 허용하는 경우

```python
from openai import OpenAI
import json

client = OpenAI()

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
  }
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 정보 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 맛집 3개를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;
print(response)
```

  
  

### 일반적인 질문을 허용하지 않는 경우

```python
from openai import OpenAI
import json

client = OpenAI()

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
  }
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 정보 외에 다른 요청을 받았을 경우, 날씨 정보만을 답변할 수 있다고 해줘."},
        {"role": "user", "content": "서울의 맛집 3개를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;
print(response)
```

  
  

### 함수호출 응답 결과 확인하기

```python
from openai import OpenAI
import json

client = OpenAI()

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
  }
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 정보 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;
print(response.content)
print(response.function_call)
print(response.tool_calls)
```

  
  

### 여러 함수를 호출하는 경우

```python
from openai import OpenAI
import json

client = OpenAI()

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
  {
      "type": "function",
      "function": {
          "name": "get_price",
          "description": "지정된 상품에 대해 가격 정보를 제공하는 함수",
          "parameters": {
              "type": "object",
              "properties": {
                  "product": {
                     "type": "string",
                     "description": "상품 이름",
                  },
              },
              "required": ["product"]
          },
      },
  }
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "상품 가격 정보를 요청받았을 경우, get_price 함수를 호출해줘."},
        {"role": "system", "content": "날씨와 상품가격 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨와 사과의 가격을 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;
print(response.content)
print(response.function_call)
print(response.tool_calls)
```

  
  

### 여러 함수를 호출하는 경우, 각 내용 읽어오기

```python
from openai import OpenAI
import json

client = OpenAI()

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
  {
      "type": "function",
      "function": {
          "name": "get_price",
          "description": "지정된 상품에 대해 가격 정보를 제공하는 함수",
          "parameters": {
              "type": "object",
              "properties": {
                  "product": {
                     "type": "string",
                     "description": "상품 이름",
                  },
              },
              "required": ["product"]
          },
      },
  }
]

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "상품 가격 정보를 요청받았을 경우, get_price 함수를 호출해줘."},
        {"role": "system", "content": "날씨와 상품가격 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨와 사과의 가격을 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;
print(response.content)
print(response.function_call)
print(response.tool_calls)

if response.tool_calls:
    tool_call_0 = response.tool_calls[0]
    print(tool_call_0)

    tool_call_1 = response.tool_calls[1]
    print(tool_call_1)
```

  
  

### 요청한 정보 읽어오기

```python
from openai import OpenAI
import json

client = OpenAI()

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

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;

if response.tool_calls:
    tool_call = response.tool_calls[0]

    arguments = tool_call.function.arguments
    function_name = tool_call.function.name

    print(arguments)
    print(function_name)
```

  
  

### 요청한 인수 읽어오기

```python
from openai import OpenAI
import json

client = OpenAI()

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

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;

if response.tool_calls:
    tool_call = response.tool_calls[0]

    arguments = tool_call.function.arguments
    function_name = tool_call.function.name

    arguments_json = json.loads(arguments)

    print(arguments_json)
```

  
  

### 요청한 인수의 이름 및 값 읽어오기

```python
from openai import OpenAI
import json

client = OpenAI()

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

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;

if response.tool_calls:
    tool_call = response.tool_calls[0]

    arguments = tool_call.function.arguments
    function_name = tool_call.function.name

    arguments_json = json.loads(arguments)

    city = arguments_json.get('city')

    print(city)
```

  
  

### 함수 호출 전체적인 틀 구성하기

```python
from openai import OpenAI
import json

client = OpenAI()

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

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
    ],
    tools=tools,
)

response = completion.choices[0].message;

if response.tool_calls:
    tool_call = response.tool_calls[0]

    arguments = tool_call.function.arguments
    function_name = tool_call.function.name

    arguments_json = json.loads(arguments)

    city = arguments_json.get('city')

    print(city)

elif response.function_call:
    print(response.function_call)

else:
    print(response.content)
```

  
  

### 함수의 이름 및 값 비교하기

```python
from openai import OpenAI
import json

client = OpenAI()

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

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
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
        print(city)
        
    else:
        print("잘못된 함수입니다.")

elif response.function_call:
    print(response.function_call)

else:
    print(response.content)
```

  
  

### 날씨 함수 호출하기

```python
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

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "날씨 정보를 요청받았을 경우, get_weather 함수를 호출해줘."},
        {"role": "system", "content": "날씨 외에 다른 요청을 받았을 경우, 일반적인 ChatGPT의 답변을 해줘."},
        {"role": "user", "content": "서울의 날씨를 알려줘."}
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
        print(weather_info)

    else:
        print("잘못된 함수입니다.")

elif response.function_call:
    print(response.function_call)

else:
    print(response.content)
```