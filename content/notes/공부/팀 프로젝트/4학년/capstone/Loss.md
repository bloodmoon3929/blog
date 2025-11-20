
![첨부파일/Pasted image 20250616155601.png](/content/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616155601.png)
 box_loss는 바운딩 박스 위치 예측에 대한 손실 (IoU 기반)이며, 객체 위치를 정확히 맞추기 위한 손실이고

 cls_loss는 클래스 분류 손실 (Cross-Entropy Loss)이며, 클래스 수가 많을수록 상대적으로 높을 수 있음.

 dfl_loss는 DFL (Distribution Focal Loss) – 박스 좌표의 세밀한 회귀를 위한 손실 박스의 정확도를 높이기 위한 보조 손실

모든 손실은 낮을수록 좋음

box_loss, cls_loss, dfl_loss가 초반 급격히 감소 후 안정화한 것으로 보아 정상적인 학습이 진행되었음을 알 수 있음

Train과 val의 손실이 비슷하거나 val이 약간 높은 수준인 것은 과적합이 없음을 나타냄