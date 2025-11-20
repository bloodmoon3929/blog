---
dg-publish: true
---
### 개요
YOLO는 You only Look once의 약어로 한 번의 연산으로 객체 검출 모델을 추론하는 프레임워크이다.
진행 방식은 다음과 같다.

1. 동영상으로 객체를 촬영하고, 이를 다음의 명령어를 통하여 사진 데이터 생성
`ffmpeg -i (영상 이름).mp4 -vf "fps=5" (저장될 폴더이름)/frame_%04d.jpg`

2. [roboflow](https://roboflow.com/)를 통하여, 데이터 라벨링 실시; 손으로 진행 시에는 사진과 같은 이름의 메모장을 생성하여 객체 명, 객체의 바운딩 박스의 좌표를 기반으로 4개의 모서리의 좌표를 기록 
3. YOLOv8n으로 학습을 진행하였음 n은 경량화 모델임을 나타냄

폴더 구조
```
dataset/
├── images/
│   ├── train/
│   └── val/
├── labels/
│   ├── train/
│   └── val/

```

dataset.yaml
```yaml
train: C:/Users/Multi 03/Desktop/code/cap/dataset/images/train
val: C:/Users/Multi 03/Desktop/code/cap/dataset/images/train  # 일단 동일 폴더 사용 가능

nc: 4
names: ['blackcat', 'greenorion', 'pocketmon', 'turtle']
```


`pip install ultralytics`
Yolov8n 모델을 돌리기 위한 모듈

YOLO 학습 코드
```py
from ultralytics import YOLO

# 모델 로드 (YOLOv8n, YOLOv8s 등 선택 가능)
model = YOLO('yolov8n.pt')  # 경량화된 버전

# 학습 시작
model.train(
    data='toy_data.yaml',
    epochs=50,
    imgsz=640,
    batch=16,
    project='runs/toy',
    name='yolov8n_toy'
)
```
추후 onnx파일로 모델 출력을 원할시
`model.export(format='onnx')`

실시간 추론 모델(PC)
```py
from ultralytics import YOLO

import cv2

# 모델 로드
model = YOLO('C:\\Users\\Multi 03\\Desktop\\code\\runs\\toy\\yolov8n_toy3\\weights\\best.pt')

# 동영상 파일 열기

video_path = 'green.mp4'  # 또는 .avi 등
cap = cv2.VideoCapture(video_path)
#cap = cv2.VideoCapture(0) #웹캡으로 할 시

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
        
    # YOLOv8로 추론
    results = model(frame, imgsz=640)[0]

    # 박스 그리기
    annotated_frame = results.plot()  # 라벨 + 바운딩 박스 포함된 이미지
    
    # 화면에 출력
    cv2.imshow('YOLOv8 Detection', annotated_frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

실제 구동 영상
![첨부파일/output_detected.mp4](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/output_detected.mp4)