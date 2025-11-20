---
dg-publish: true
---
우선 LSTM은 [[공부/팀 프로젝트/4학년/Gseed/4주차(3-31~4-6)/RNN]](Recurrent Neural Network)의 한 종류이며, RNN의 장기 의존성 문제를 해결하기 위해서 나온 모델이다.

순환 신경망은 추가적인 저장공간을 가질 수 있다. 이 저장공간이 그래프의 형태를 가짐으로써 시간 지연의 기능을 하거나 피드백 루프를 가질 수도 있다. 이와 같은 저장공간을 게이트된 상태(gated state) 또는 게이트된 메모리(gated memory)라고 하며, LSTM과 게이트 [[공부/팀 프로젝트/4학년/Gseed/4주차(3-31~4-6)/순환 뉴런|순환 유닛(GRU)]]이 이를 응용하는 대표적인 예시이다.


![첨부파일/Pastedimage20250407210340.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407210340.png)
LSTM의 경우 RNN과 유사하나, 4가지의 레이어를 가집니다.

![첨부파일/Pastedimage20250407210425.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407210425.jpg)
우선 Cell State는 LSTM의 핵심 부분으로써, 정보를 변화하지 않고, 그대로 전달하는 부분이며, 상태가 많이 변화하여도 경사가 잘 전달 될 것입니다.

Gate라는 구조에 의해 정보가 추가되고, 제거 될지 정합니다.

![첨부파일/Pastedimage20250407210628.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407210628.jpg)
Forget Gate는 [[첨부파일/tf-Pastedimage20240702202221.png|sigmoid]] 함수에 의해 과거의 정보를 버릴지 말지를 결정하는 Gate입니다. 반환된 값이 1이면, 정보를 저장하고, 0이면 폐기합니다.


![첨부파일/Pastedimage20250407210806.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407210806.jpg)
Input Gate는 현재 정보를 기억하기 위한 게이트로 [[첨부파일/tf-Pastedimage20240702212625.png|tanh]] 함수를 통해 cell state의 값을 더할지 말지를 정하는 역할을 수행합니다.

![첨부파일/Pastedimage20250407210938.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407210938.jpg)
Gate를 통해 가감되는 값을 통해 State값을 업데이트하는 과정입니다.

![첨부파일/Pastedimage20250407211039.jpg](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407211039.jpg)
Output Gate는 tanh 함수를 통해 최종적으로 얻어진 Cell State 값을 얼마나 빼낼지 결정하는 역할을 합니다.