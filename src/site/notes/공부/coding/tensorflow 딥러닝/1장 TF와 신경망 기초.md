---
{"dg-publish":true,"permalink":"/공부/coding/tensorflow 딥러닝/1장 TF와 신경망 기초/"}
---


# TensorFlow 가 무엇인가
### 특징
- Python, C++, Java, R, Go등의 언어를 지원함
- 고급 신경망 API
- 정적 그래프에 기반한 그래프연산과 함께 즉시 연산 지원이 도입됨

## Keras란 무엇인가?
딥러닝 모델을 만들고 훈련시키기 위한 기초 구성 요소를 구성하는 API

## 신경망이란?
인공 신경망(Artificial neural networks;ANN)은 포유류의 중추 신경계 연구에서 영감을 받은 머신러닝 모델이다.
결국 머신러닝은 여러 겹으로 이루어진 덧셈과 곱셈연산에 지나지 않으나, 비선형 활성화와 결합하여 여러겹을 쌓을 시에는 모든 값을 학습시킬 수 있을 것이다.

## 퍼셉트론이란
n개의 크기를 갖는 입력 벡터가 주어지면 true, false를 반환하는 간단한 알고리즘

수식으로 나타내면 다음과 같다

$$
f(x)=
\begin{cases}
1, wx+b>0\\
0, else
\end{cases}
$$
퍼셉트론은 오로지 true, false 만을 반환할 수 있다는 것을 상기하자

### 다중 퍼셉트론
단일 선형 계층 모델인 퍼셉트론이 여러 계층 존재할 시의 이름임

사용자는 입력과 출력만을 볼 수 있고, 중간계층은 은닉층(hidden layers)라는 이름으로 불리며 숨겨져 있다
### 퍼셉트론 훈련의 문제점과 해결책
퍼셉트론은 오로지 0과 1의 큰 변화만 가능하기에 학습에 도움이 되지 않는다.

이것을 해결하기 위해 점진적으로 변화하는 함수가 필요하다.(미분 가능한 연속함수)

### 활성화 함수
활성화 함수는 점진적으로 변화하는 함수이며, 퍼셉트론처럼 0, 1만의 대답만을 하는 것이 아닌 그 중간값의 대답을 할 수 있기에 신경망의 오류는 조금씩 줄이며 적응해 나아가는 학습 알고리즘을 개발 할 수 있음
[활성화 함수 그래프](https://www.geogebra.org/graphing/xr3nzzsw)
#### 시그모이드
$$
\delta(x)=\frac{1}{1+e^{-x}}
$$
입력이 $(-\infty , ~\infty)$에서 변할 때, 출력은 (0,1)에서 작은 변화를 가진다.
![첨부파일/tf-Pastedimage20240702202221.png](/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/tf-Pastedimage20240702202221.png)
#### tanh
$$
tanh(z)=\frac{e^z-e^{-z}}{e^z+e^{-z}}
$$
입력이 $(-\infty , ~\infty)$에서 변할 때, 출력은 (-1,1)에서 변화를 가진다.
![첨부파일/tf-Pastedimage20240702212625.png](/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/tf-Pastedimage20240702212625.png)
#### ReLU
$$
f(x)=max(0,x)
$$
입력이 $(-\infty , ~\infty)$에서 변할 때, 출력은 $(0,\infty)$에서 변화를 가진다.
![첨부파일/tf-Pastedimage20240702213552.png](/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/tf-Pastedimage20240702213552.png)
### ELU와 LeakyReLU

#### ELU
$$
f(\alpha,x)=
\begin{cases}
\alpha(e^x-1), if x\leq 0\\
x, if x>0
\end{cases}
$$
입력이 $(-\infty , ~\infty)$에서 변할 때, 출력은 $\alpha$값에 따라 변화를 가진다. ($\alpha = 1$)일 때,
![첨부파일/tf-Pastedimage20240702213625.png](/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/tf-Pastedimage20240702213625.png)
#### LeakyReLU
$$
f(\alpha,x)=
\begin{cases}
\alpha x, if x\leq 0\\
x, if x>0
\end{cases}
$$
입력이 $(-\infty , ~\infty)$에서 변할 때, 출력은 $\alpha$값에 따라 변화를 가진다.
![첨부파일/tf-Pastedimage20240702213719.png](/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/tf-Pastedimage20240702213719.png)
## 예제 - 필기체 학습
이미 정답이 존재하는 지도 학습임

### 원-핫 인코딩
신경망 내부에 사용될 정보를 인코딩하는 간단한 도구

범주형 특징을 숫자형 변수로 변환하면 좋을 때 사용한다.

학습 알고리즘이 수치형 함수를 처리하도록 특화될 경우 데이터 마이닝에서 흔히 사용된다.

