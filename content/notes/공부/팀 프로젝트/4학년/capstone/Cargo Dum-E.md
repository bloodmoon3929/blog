---
dg-publish: true
---
# 작품의 목적
코로나 이후의 물류 시장의 중요성이 대두되고 있으며, 미국의 기업 아마존이나, 중국의 기업 알리바바에서는 기계를 사용하는 것이 사람을 고용하는 것 보다 50%의 비용 절감이 있다고 밝혔다. 이에 모빌리티 로봇에 로봇팔을 달아 사물을 회피하며, 물류를 이송해주는 로봇이 있어야 하겠다고 생각하게 되었다.
## 유사 제품
로보락 - Saros z70
2025년 1월에 열린 국제 전자제품 박람회, CES, 에서 중국의 기업 로보락에서 로봇팔이 달린 로봇청소기를 선보임

# 사용된 기술
[[ROS2(Robot Operating System)|ROS2]], [[YOLO]], FCNN

### Yolo 성능 지표
#### [[공부/팀 프로젝트/4학년/capstone/Yolo 성능 지표/Confusion Matrix|Confusion Matrix]]
모델이 예측한 클래스와 실제 클래스 간의 관계를 표 형식으로 나타낸 것
#### [[공부/팀 프로젝트/4학년/capstone/Yolo 성능 지표/Normalized Confusion Matrix|Confusion Matrix]]
정규화된 혼동 행렬은 각 행(실제 클래스)을 기준으로 분류 정확도를 백분율로 나타낸 그래프
#### [[공부/팀 프로젝트/4학년/capstone/Yolo 성능 지표/Class Labels|Class Labels]]
모델이 분류하는 클래스들의 명칭을 나열한 것
#### [[공부/팀 프로젝트/4학년/capstone/Yolo 성능 지표/바운드 박스의 중심 좌표 x, y 그래프|바운드 박스의 중심 좌표 x, y 그래프]]
객체의 바운딩 박스 중심 좌표(x, y)의 분포를 2차원 평면에 시각화한 그래프
#### [[공부/팀 프로젝트/4학년/capstone/Yolo 성능 지표/바운딩 박스의 크기 그래프|바운딩 박스의 크기 그래프]]
객체의 바운딩 박스 크기 (높이와 너비)의 분포
#### [[바운딩 박스]]
실제 라벨된 이미지(샘플)에 적용된 바운딩 박스를 시각적으로 나타낸 것
#### [[Precision-Recall Curve]]
이진 혹은 다중 클래스 분류 모델이 양성 클래스를 얼마나 잘 예측하는지를 나타내는 시각적 도구

#### [[Precision Curve]]
confidence threshold(임계값)를 변화시켰을 때 정밀도(Precision)가 어떻게 변화하는지를 보여주는 곡선

#### [[Recall Curve]]
confidence threshold 값이 변화함에 따라 모델이 얼마나 많은 실제 양성 샘플을 놓치지 않고 탐지하는지

#### [[F1 Score Curve]]
precision과 recall의 조화 평균으로, 이 두 값 사이의 균형을 평가하는 중요한 지표

#### [[Loss]]
박스 위치 예측에 대한 손실, 객체 인식에 대한 손실 값

#### [[객체 검출 성능]]
예측 값의 정답 비율

#### [[박스 검출성능]]
객체의 평균을 평균 낸 값

## 모빌리티
### 개요
ROS2를 통한 자율 주행 구현을 목표로 하였으며, 라이다를 통하여 장애물 데이터를 수집하여, 이를 FCNN을 통해 회피 모델을 제작
### 하드웨어 부
![첨부파일/Pasted image 20250616160050.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616160050.png)
![첨부파일/Pasted image 20250616160106.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616160106.png)
1. Jetson Xavier NX
2. RPLiDAR
3.  Arduino Mega
4. 스텝 모터
### 노드 구성
> Serial Communication Node : 예측한 방향을 구독하여, Arduin0 Mega로 방향 값 전달
> Liar Node : RPLiDAR 센서로 부터 거리 데이터를 수신하여 퍼블리시
> Direction Predictor Node : 실시간 거리 데이터를 토대로 이동 방향을 추론

### 문제점
1. 모델 학습 결과 불균형한 학습 데이터로 인한 낮은 정확도

### 향후 계획
1. FCNN에서 CNN으로 사용하는 모델 교체
2. 고전적인 경로 최적화 알고리즘을 통합하여 인공지능이 아닌 알고리즘으로의 장애물 회피

## 로봇 팔
### 개요
ROS2를 통하여 세분화된 로봇 팔 제어를 목표로 하였고, 깊이 인식 카메라를 통한 실시간 객체 탐지 모델 추론과 깊이 값을 통한 객체와의 거리 획득, BPU(Brian Processing Unit)을 사용한 모델 추론을 목표로 하였음
### 하드웨어 부
![첨부파일/Pasted image 20250616161810.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616161810.png)
![첨부파일/Pasted image 20250616161816.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616161816.png)
1. RDK 3X
2. 아두이노
3. 서브 모터
4. 깊이 인식 카메라
### 노드 구성
> openni camera node : 깊이 인식 카메라의 rbg값과 깊이 값을 반환하는 노드

 Orbbec사의 Astra 3D Depth Camera는 OpenNI 어플리케이션과 호환성이 높게 개발되어 라이더를 통한 3차원 지도 재구성 등의 기능을 지원하는 고성능 카메라이다.
 하지만 문제점으로는 일반적인 USB 카메라처럼 사용할 수 없고, OpenNI 어플리케이션을 통하여 사용해야 한다.
 이 문제를 해결하기 위해 카메라 발행 노드를 만들었다.

```bash
colcon build --packages-select openni_camera_pkg
source install/setup.bash

ros2 run openni_camera_pkg openni_camera_node
```

> bounding box : rbg값으로 추론 모델을 통해 바운딩 박스의 중심 값과 객체와의 거리를 반환해주는 노드

![첨부파일/Pasted image 20250616162253.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616162253.png)
 Yolov8n을 통해 학습한 pt 파일을 통해 실시간 객체 추론하는 코드로 객체에 바운딩 박스를 씌우고, 바운딩 박스의 중심 좌표를 기준으로 거리를 측정한다.
 중심 좌표의 값과 거리를 발행한다.
 문제점으로는 이 경우 다소 느리다는 문제점이 있다. 이는 BPU(Brain Processing Unit)를 가진 RDK 3X 보드는 BIN(rknn)파일로 추론할 경우 빠른 성능을 보이기에 이로 변환할 예정이다.
 추가로 작은 객체에 대해서 추론을 못해 멀리있는 객체는 인식하지 못한다


```bash
colcon build --packages-select bounding_box
source install/setup.bash

ros2 run bounding_box bounding_box
```


> bbox listener pkg : 객체와 중심 좌표, 거리를 반환하여 rx/tx 통신으로 로봇을 제어할 노드

![첨부파일/Pasted image 20250616162322.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616162322.png)
 객체의 깊이 값을 구독함으로써, 객체와의 거리를 통해 로봇 팔과 자율 주행 부분을 제어할 계획이다.

 현재는 거리 값 만을 출력해주고 있는 데, 이는 로봇 팔과 자율 주행이 합쳐지고, 카메라가 고정된 위치에 있어야 시작 할 수 있기에 진행이 되지 않았다.

```bash
colcon build --packages-select bbox_listener_pkg
source install/setup.bash

ros2 run bbox_listener_pkg bbox_distance_listener
```
### RX/TX 통신
![첨부파일/Pasted image 20250616162346.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616162346.png)

 RX/TX 통신의 테스트를 위해 간단한 코드로 테스트를 한 모습이다.
 아두이노는 5V, RDK 3X는 3.3V이기에 전압 강하를 위해 저항을 이용하여 전압 분배 법칙을 활용하였다.
 추후 RDK 3X에서 아두이노를 제어할 때, RX/TX 통신을 통해 제어할 예정이다

### BPU
 RDK 3X보드는 horizonrobotics에서 제조된 칩을 기반으로 D-Robotics 사에서 개발한 인공지능 전용 보드이다.
 Open-Explorer을 통하여 pt 파일을 bin(rknn) 파일로 변환하여 BPU을 사용한 인공지능 추론이 가능하다.
 하지만 RDK 3X보드는 이미 해외에서는 3년전 출시한 모델이고, 3년 사이 horizonrobotics사는 자율주행 회사로 변하여 Open-Explorer을 배포하고 있지 않다. 국내에는 올해 출시되어 국내의 레퍼런스도 존재하지 않는다.
 현재 Docker를 통해 남아있는 자료로 Bin파일로 변환에는 성공하였고, 이를 추론하는 코드를 작성 중에 있다.
### 코드
#### 아두이노
```ino
#include <Servo.h>
#include <SoftwareSerial.h>
SoftwareSerial Bluetooth(3, 4);

Servo servo1;  // BASE
Servo servo2;  // HOMBRO1
Servo servo3;  // HOMBRO2
Servo servo4;  // CODO1
Servo servo5;  // CODO2
Servo servo6;  // MUÑECA
Servo servo7;  // GRIPPER

int servoVel[] = {15, 25, 0, 20, 20, 15, 15}; // 속도 배열 (s1Vel, s2Vel, s3Vel, s4Vel, s5Vel, s6Vel, s7Vel)
int velG = 25;
int index = 0;

int servoAct[8]; // 현재 위치 배열
int servoAnt[8]; // 이전 위치 배열
int servoPos[8][50]; // 저장된 위치 배열

String bt, btS;

// 서보 모터를 지정된 각도로 부드럽게 이동시키는 함수
void moveServo(Servo &servo, int &currentPos, int targetPos, int velocity) {
  if (currentPos > targetPos) {
    for (int j = currentPos; j >= targetPos; j--) {
      servo.write(j);
      delay(velocity);
    }
  } else if (currentPos < targetPos) {
    for (int j = currentPos; j <= targetPos; j++) {
      servo.write(j);
      delay(velocity);
    }
  }
  currentPos = targetPos;
}

// 서보 1-7 중 지정된 서보를 목표 위치로 이동
void moveSpecificServo(int servoNum, int targetPos) {
  switch (servoNum) {
    case 1: // BASE
      moveServo(servo1, servoAnt[1], targetPos, servoVel[0]);
      break;
    case 2: // HOMBRO
      if (servoAnt[2] > targetPos) {
        for (int j = servoAnt[2]; j >= targetPos; j--) {
          servo2.write(j);
          servo3.write(180 - j);
          delay(servoVel[1]);
        }
      } else {
        for (int j = servoAnt[2]; j <= targetPos; j++) {
          servo2.write(j);
          servo3.write(180 - j);
          delay(servoVel[1]);
        }
      }
      servoAnt[2] = targetPos;
      break;
    case 4: // CODO1
      moveServo(servo4, servoAnt[4], targetPos, servoVel[3]);
      break;
    case 5: // CODO2
      moveServo(servo5, servoAnt[5], targetPos, servoVel[4]);
      break;
    case 6: // MUÑECA
      moveServo(servo6, servoAnt[6], targetPos, servoVel[5]);
      break;
    case 7: // GRIPPER
      moveServo(servo7, servoAnt[7], targetPos, servoVel[6]);
      break;
  }
}

// 저장된 위치 기반으로 서보 실행
void executeServoMovement(int i, int nextIndex, int velocity) {
  // 서보 1 (BASE)
  if (servoPos[1][i] != servoPos[1][nextIndex]) {
    moveServo(servo1, servoPos[1][i], servoPos[1][nextIndex], velocity);
  }
  
  // 서보 2 & 3 (HOMBRO1 & HOMBRO2)
  if (servoPos[2][i] != servoPos[2][nextIndex]) {
    if (servoPos[2][i] > servoPos[2][nextIndex]) {
      for (int j = servoPos[2][i]; j >= servoPos[2][nextIndex]; j--) {
        servo2.write(j);
        servo3.write(180 - j);
        delay(velocity);
      }
    } else {
      for (int j = servoPos[2][i]; j <= servoPos[2][nextIndex]; j++) {
        servo2.write(j);
        servo3.write(180 - j);
        delay(velocity);
      }
    }
  }
  
  // 서보 4 (CODO1)
  if (servoPos[4][i] != servoPos[4][nextIndex]) {
    moveServo(servo4, servoPos[4][i], servoPos[4][nextIndex], velocity);
  }
  
  // 서보 5 (CODO2)
  if (servoPos[5][i] != servoPos[5][nextIndex]) {
    moveServo(servo5, servoPos[5][i], servoPos[5][nextIndex], velocity);
  }
  
  // 서보 6 (MUÑECA)
  if (servoPos[6][i] != servoPos[6][nextIndex]) {
    moveServo(servo6, servoPos[6][i], servoPos[6][nextIndex], velocity);
  }
  
  // 서보 7 (GRIPPER)
  if (servoPos[7][i] != servoPos[7][nextIndex]) {
    moveServo(servo7, servoPos[7][i], servoPos[7][nextIndex], velocity);
  }
}

void setup() {
  Serial.begin(115200);
  Bluetooth.begin(9600);
  Bluetooth.setTimeout(10);
  
  // 서보 초기화
  servo1.attach(5, 510, 1200);
  servo2.attach(11, 650, 1400);
  servo3.attach(6, 650, 1400);
  servo4.attach(7, 650, 1400);
  servo5.attach(8, 650, 1400);
  servo6.attach(9, 800, 1290);
  servo7.attach(10, 700, 1290);
  
  // 초기 위치 설정
  servoAnt[1] = 90;  // BASE
  servoAnt[2] = 100; // HOMBRO1
  servoAnt[3] = 80;  // HOMBRO2
  servoAnt[4] = 115; // CODO1
  servoAnt[5] = 60;  // CODO2
  servoAnt[6] = 90;  // MUÑECA
  servoAnt[7] = 60;  // GRIPPER
  
  servo1.write(servoAnt[1]);
  servo2.write(servoAnt[2]);
  servo3.write(servoAnt[3]);
  servo4.write(servoAnt[4]);
  servo5.write(servoAnt[5]);
  servo6.write(servoAnt[6]);
  servo7.write(servoAnt[7]);
  
  delay(50);
}

void loop() {
  if (Bluetooth.available() > 0) {
    bt = Bluetooth.readString();
    
    // 서보 제어 명령 처리
    if (bt.startsWith("s1") || bt.startsWith("s2") || 
        bt.startsWith("s4") || bt.startsWith("s5") || 
        bt.startsWith("s6") || bt.startsWith("s7")) {
      
      int servoNum = bt.charAt(1) - '0'; // 서보 번호 추출
      btS = bt.substring(2, bt.length());
      int targetPos = btS.toInt();
      
      if (servoNum == 2 || servoNum == 6) {
        Serial.println(targetPos);
      }
      
      moveSpecificServo(servoNum, targetPos);
    }
    
    // 위치 저장 명령
    else if (bt.startsWith("SAVE")) {
      servoPos[1][index] = servoAnt[1]; // BASE
      servoPos[2][index] = servoAnt[2]; // HOMBRO1
      servoPos[4][index] = servoAnt[4]; // CODO1
      servoPos[5][index] = servoAnt[5]; // CODO2
      servoPos[6][index] = servoAnt[6]; // MUÑECA
      servoPos[7][index] = servoAnt[7]; // GRIPPER
      index++;
    }
    
    // 초기화 명령
    else if (bt.startsWith("RESET")) {
      memset(servoPos, 0, sizeof(servoPos));
      index = 0;
    }
    
    // 실행 명령
    else if (bt.startsWith("RUN")) {
      while (bt.startsWith("RESET") != true) {
        for (int i = 0; i <= index - 2; i++) {
          if (Bluetooth.available() > 0) {
            bt = Bluetooth.readString();
            
            // 일시정지 명령
            if (bt.startsWith("PAUSE")) {
              while (bt.startsWith("RUN") != true) {
                if (Bluetooth.available() > 0) {
                  bt = Bluetooth.readString();
                  if (bt.startsWith("RESET")) {
                    break;
                  }
                }
              }
            }
            
            // 속도 조절 명령
            else if (bt.startsWith("ss")) {
              btS = bt.substring(2, bt.length());
              velG = btS.toInt();
            }
          }
          
          // 저장된 위치로 서보 이동 실행
          executeServoMovement(i, i + 1, velG);
        }
      }
    }
  }
}
```
# 계획

| 문제점                           | 해결 방안                         |
| ----------------------------- | ----------------------------- |
| 1. 현재 로봇에 대한 제어가 이루어 지고 있지 않음 | 1. ROS2와 rx/tx 통신을 통한 아두이노 제어 |
| 2. RDK 3X를 통한 Yolo 추론이 느림     | 2. bin(rknn)을 사용한 BPU 추론      |
| 3. 일부 잘못 학습된 레이블이 존재함         | 3. 학습 데이터 추가 및 변경             |
| 4. 부족한 데이터 셋                  | 4. 광범위한 학습 데이터 셋 수집           |
| 5. 단순한 딥러닝 모델                 |  5. 새로운 딥러닝 모델 도입             |
1. 현재 상황
	- Yolov8n을 통한 실시간 객체 추론 모델 생성
	- BPU로 추론할 수 있는 Bin 파일로 변환
	- RX/TX 통신
	- 데이터 수집 및 학습 환경 구축
	- 실시간 수집 데이터기반 방향 계산 및 이동 환경 구축
2. 2학기 목표
	- BPU를 통한 추론
	- 시리얼 통신으로 아두이노 제어
	- 깊이 값을 기준으로 아두이노 제어
	- 다양한 환경에 대한 광범위한 데이터 수집
	- 모델 성능 최적화 및 CNN도입
3. 추후 목표
	- 박스의 이미지를 통한 물류 제어
	- 장애물 회피 혹은 장애물 제거
	- 카메라 노드를 구독하여 경로 계산 및 라이다 데이터 구독을 통한 경로 조정
4. 추후 사용 방안
	- 저렴한 학습용 로봇 팔과 자율주행 기기
	- 최신식 로봇 청소기 기술
	- 물류 센터에서의 물류 제어

# 활동 사진
![첨부파일/cap-20250329_171938.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/cap-20250329_171938.jpg)


![첨부파일/20250412_181608.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/20250412_181608.jpg)

![첨부파일/20250412_181611.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/20250412_181611.jpg)![첨부파일/20250412_181608 1.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/20250412_181608%201.jpg)



![첨부파일/20250412_181611 1.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/20250412_181611%201.jpg)


![첨부파일/20250412_182340.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/20250412_182340.jpg)



![첨부파일/20250412_200250.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/20250412_200250.jpg)

![첨부파일/KakaoTalk_20250412_202505804.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/KakaoTalk_20250412_202505804.jpg)

![첨부파일/KakaoTalk_20250414_191717818.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/KakaoTalk_20250414_191717818.jpg)

# 예산
## 1차 구매 내역

| No  | 품명                                                  | 수량  | 단가      | 합계액      |
| --- | --------------------------------------------------- | --- | ------- | -------- |
| 1   | UL1015 12AWG 절연전선 빨간색 1M                            | 4   | 2,500원  | 10,000원  |
| 2   | UL1015 12AWG 절연전선 검정색 1M                            | 4   | 2,300원  | 9,200원   |
| 3   | FND 전압표시 XL4015 강하형 DC-DC 5A 가변 컨버터 [SZH-PWSDF-036] | 3   | 4,300원  | 12,900원  |
| 4   | RDK X3 - 5TOPS 올인원 인공지능 로봇 개발보드(4GB RAM)            | 1   | 83,000원 | 83,000원  |
| 5   | RDK X3 카메라 어댑터                                      | 1   | 4,500원  | 4,500원   |
| 6   | DC 잭 NT10-AF36                                      | 1   | 1,000원  | 1,000원   |
| 7   | DC컨버터 12A 고출력 감압 정전압 스텝다운 모듈 [SZH EKBD-058]         | 2   | 3,300원  | 6,600원   |
| 8   | KC인증 18650 리튬배터리 3.7V 2200mAh [ZM18650-2200 KC01]   | 2   | 3,000원  | 6,000원   |
|     | 부가세                                                 |     |         | 13,320원  |
|     | 합계                                                  |     |         | 146,520원 |

## 2차 구매 내역

| No  | 품명                                                             | 수량  | 단가       | 합계액      |
| --- | -------------------------------------------------------------- | --- | -------- | -------- |
| 1   | Nema 23 56각 스테핑모터 NK266-02A-F 1.8도 11Kg.cm 고 토크 3D프린터 IoT 아두이노 | 2   | 47,200원  | 94,400원  |
| 2   | FND 전압표시 XL4015 강하형 DC-DC 5A 가변 컨버터 [SZH-PWSDF-036]            | 2   | 4,300원   | 8,600원   |
| 3   | 볼캐스터 소형 11mm                                                   | 2   | 3,600원   | 7,200원   |
| 4   | Astra 3D Depth Camera                                          | 1   | 107,000원 | 107,000원 |
| 5   | RDK X3 공식 케이스                                                  | 1   | 10,500원  | 10,500원  |
| 6   | 안전라인 미끄럼방지 테이프 1EA 색상블랙 폭(mm) 25 [K55874067]                   | 1   | 4,500원   | 4,500원   |
| 7   | KC인증 18650 리튬배터리 3.7V 2200mAh [ZM18650-2200 KC01]              | 2   | 3,000원   | 6,000원   |
| 8   | ATMEGA328P-AU                                                  | 2   | 3,000원   | 6,000원   |
| 9   | 마이크로 마우스, 로봇용 바퀴,휠(Wheel) [HD95-14-6B] 연결축 직경:6mm              | 2   | 35,200원  | 70,400원  |
|     | 부가세                                                            |     |          | 31,460원  |
|     | 합계                                                             |     |          | 346,060원 |
## 개인 구매
TowerPro 호환 서보모터 MG946R(https://www.devicemart.co.kr/goods/view?no=1313387)
6,500 * 3=19,500원

TowerPro 호환 메탈기어 디지털 서보모터 MG995(https://www.devicemart.co.kr/goods/view?no=1313386)
6,500 * 3=19,500원

## 추후 구매 예정
라즈베리파이 AI 키트(https://www.eleparts.co.kr/goods/view?no=14328530)
98,000원

라즈베리파이 카메라모듈 3 (Raspberry Pi Camera Module 3)(https://www.devicemart.co.kr/goods/view?no=14917048)
38,000원

라즈베리파이5 FPC 카메라 케이블 300mm - 22P(0.5mm) to 15P(1mm)(https://www.devicemart.co.kr/goods/view?no=15285261)
2,700원

[SMG] 라즈베리파이 호환 18650 과충전 보호 배터리 홀더 개발 보드 2셀 (케이블 포함) [TYE-BH002](https://www.devicemart.co.kr/goods/view?no=14495291)
7,500원

[ZM] KC인증 18650 리튬배터리 3.7V 2200mAh [ZM18650-2200-KC01](https://www.devicemart.co.kr/goods/view?no=14117576)
3,200 * 6= 19,200원
# 피드백
전압 강하 말고, level translater를 사용하여 전압을 변화하라
반경내의 객체를 이동하는 등의 시스템을 설계하라
객체를 집지 못하였을 때에 대한 피드백을 받아라
PPT 제작시 페이지 번호를 입력하라
PPT 페이지는 최소화 하라

##### Mobilnetv2 분류 모델 (객체 감지 모델로 변경으로 폐지)
```py
import os
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
import torch
import torch.nn as nn
import torch.optim as optim

# 하이퍼파라미터
batch_size = 32
epochs = 10
learning_rate = 0.001
num_classes = 4  # 인형 4종

# 데이터 전처리
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],  # ImageNet 기준
                         std=[0.229, 0.224, 0.225])
])

train_dataset = datasets.ImageFolder("C:/Users/Multi 03/Desktop/code/cap/dataset", transform=transform)

train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

# MobileNetV2 로드 + 분류기 수정
model = models.mobilenet_v2(pretrained=True)
model.classifier[1] = nn.Linear(model.last_channel, num_classes)

# 학습 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# 학습 루프
for epoch in range(epochs):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    print(f"Epoch {epoch+1}: Loss {running_loss:.4f}, Acc {100*correct/total:.2f}%")

# 모델 저장
torch.save(model.state_dict(), "mobilenetv2_toys.pth")
```

# 레퍼런스
Developing a Pick-and-Place Robotic Arm - https://youtube.com/watch?v=f69PbA9I6qY&si=PUAP6Uk-h3CO5C9G

RDK-X3 AI 추론 성능을 갖춘 개발 보드 출시! (언박싱, 사용법, 벤치마크) 
(https://youtube.com/watch?v=uqvFwBUoVM0&si=rZJJJJ6yivaLMBTt)

Robotic Arm with Arduino - Save/Play/Export/Import Positions. 
(https://youtube.com/watch?v=ZEir102PxJ8&si=wrNiqgGBH_wRsfYj)

RDK X3
https://blog.naver.com/no1_devicemart/223689493916