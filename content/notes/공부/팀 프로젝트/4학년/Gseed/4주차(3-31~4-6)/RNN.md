---
dg-publish: true
---
RNN이란 인공 신경망의 한 종류로, 유닛간의 연결이 순환적 구조를 갖는 특징을 갖고 있다.

전통적인 neural network는 이전에 일어난 사건을 바탕으로 나중에 일어나는 사건을 생각하지 못한다. RNN은 이러한 신경망과 달리 은닉층의 노드에서 활성화 함수를 통해 나온 결과값을 출력층 방향으로도 보내면서, 다시 은닉층 노드의 다음 계산의 입력으로 보내는 특징을 가지고 있다. 메모리 셀이 출력층 다음 시점의 t+1의 자신에게 보내는 값을 hidden state라고 칭한다. t 시점의 메모리 셀은 t−1 시점의 메모리 셀이 보낸 은닉 상태값을 t시점의 은닉 상태 계산을 위한 입력값으로 사용된다. 이러한 RNN의 체인처럼 이어지는 성질은 입력데이터가 sequence나 iteration 객체 형태로 이어지는 것을 의미한다. 즉, 시계열 데이터(time series)에 최적인 neural network이다.

RNN의 가장 큰 단점은 시간 격차(time step)가 늘어날수록 학습정보를 계속 이어나가면 성능이 매우 떨어지게 된다는 것이다. 이에 대해 자세히 설명하자면 관련정보와 그 정보를 사용하는 지점사이 거리가 멀 경우 역전파시 gradient가 소멸되어 parameter들을 업데이트 할 수 없다는 것이다. 이를 vanishing problem이라고 칭한다. 따라서 RNN은 비교적 짧은 sequence에 대해서만 효과를 보인다. 이를 보완하기 위해 LSTM은 RNN의 은닉상태, hidden state에 셀 상태, cell state를 추가하였다.

![첨부파일/Pastedimage20250407205817.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407205817.png)


![첨부파일/Pastedimage20250407210229.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pastedimage20250407210229.png)
RNN은 모듈을 반복하는 체인과 같은 형태를 하고 있으며, RNN은 단순한 반복 구조를 가집니다.