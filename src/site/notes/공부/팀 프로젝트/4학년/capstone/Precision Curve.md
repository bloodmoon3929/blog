---
dg-publish: true
---

![첨부파일/Pasted image 20250616155443.png](/src/site/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616155443.png)
 Precision curve는 모델의 confidence threshold(임계값)를 변화시켰을 때 정밀도(Precision)가 어떻게 변화하는지를 보여주는 곡선입니다. 높은 threshold에서는 잘못된 양성 예측이 줄어들며 precision이 높아지지만, 너무 높으면 true positive도 감소하여 성능 저하로 이어질 수 있습니다. 본 곡선을 통해 적절한 threshold를 설정함으로써 precision을 최적화할 수 있으며, 이 모델에서는 중간 임계값에서 안정적인 precision 값을 보여주는 것으로 보아 false positive가 효과적으로 억제되고 있음을 알 수 있습니다.