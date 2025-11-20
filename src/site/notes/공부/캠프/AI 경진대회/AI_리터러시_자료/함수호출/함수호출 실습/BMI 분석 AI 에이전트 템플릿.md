### 실행 준비

```python
!pip install openai
!pip install gradio
```

  
  

### BMI 분석 AI 에이전트 템플릿

```python
import gradio as gr

# BMI 계산 함수
def calculate_bmi(height, weight):

    # height, weight -> ChatGPT
    # ???

    #아래 변수의 내용을 ChatGPT 응답으로 채울 것
    bmi_value = 0
    bmi_status = ""
    food_recommendation = ""
    exercise_recommendation = ""

    return bmi_value, bmi_status, food_recommendation, exercise_recommendation

# Gradio Blocks 레이아웃 구성
with gr.Blocks() as demo:
    # HTML로 직접 CSS 삽입하여 스타일을 지정
    gr.HTML("""
    <style>
        body {
            background-color: #001f3d;  /* dark blue */
            color: white;               /* 텍스트 색상 흰색 */
            font-family: 'Helvetica', sans-serif;
        }
        h1 {
            text-align: center;         /* 제목 중앙 정렬 */
            font-size: 3em;
            margin-top: 50px;
        }
        .gradio-container {
            background-color: #001f3d;  /* 전체 컨테이너 배경 색상 */
            color: white;               /* 텍스트 색상 흰색 */
        }
    </style>
    """)
    # HTML로 제목 추가
    gr.HTML("<h1 style='color: white'>AI BMI 계산기</h1>")

    # 입력 폼 구성
    with gr.Row():
        height_input = gr.Number(label="키 (cm)")
        weight_input = gr.Number(label="몸무게 (kg)")

    # 결과 출력
    with gr.Row():
        bmi_result = gr.Textbox(label="BMI", interactive=False)
        bmi_status = gr.Textbox(label="체중 상태", interactive=False)

    food_recommendation = gr.Textbox(label="추천 음식", interactive=False, lines=5)
    exercise_recommendation = gr.Textbox(label="추천 운동", interactive=False, lines=5)

    # 버튼 클릭 시 BMI 계산 함수 실행
    calculate_button = gr.Button("BMI 계산")
    calculate_button.click(fn=calculate_bmi, inputs=[height_input, weight_input],
                           outputs=[bmi_result, bmi_status, food_recommendation, exercise_recommendation])

# 인터페이스 실행
demo.launch()
```