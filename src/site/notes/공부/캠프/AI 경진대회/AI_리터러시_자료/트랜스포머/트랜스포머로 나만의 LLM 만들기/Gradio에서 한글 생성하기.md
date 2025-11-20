### 필요한 모듈 설치하기

```python
!pip install transformers --quiet
!pip install torch --quiet
```

  
  

### Gradio 설치하기

```python
!pip install gradio
```

  
  

### Gradio에서 한글 생성기 사용하기

```python
import gradio as gr
from transformers import pipeline

generator = pipeline(model="cateto/korean-gpt-neox-125M")

def predict(text):
  return generator(text)[0]["generated_text"]

with gr.Blocks() as demo:

    gr.Markdown(
    """
    # 홍길동이 만든 GPT 서비스
    생성할 시작 문구를 입력해 주세요.
    """)

    gr.Interface(
      fn=predict,
      inputs='text',
      outputs='text',
)

demo.launch()
```