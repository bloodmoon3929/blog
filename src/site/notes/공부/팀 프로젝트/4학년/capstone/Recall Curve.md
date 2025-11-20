---
dg-publish: true
---

![첨부파일/Pasted image 20250616155503.png](/src/site/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250616155503.png)
 Recall curve는 confidence threshold 값이 변화함에 따라 모델이 얼마나 많은 실제 양성 샘플을 놓치지 않고 탐지하는지를 보여줍니다. threshold가 낮아질수록 모델은 더 많은 true positive를 예측하지만, 동시에 false positive가 증가할 수 있어 precision과 trade-off 관계를 형성합니다. 본 모델은 낮은 threshold에서 높은 recall을 기록하며, 전체 양성 샘플 중 많은 수를 포착하는 데 성공했습니다. 이 정보는 예측이 누락되면 안 되는 경우(예: 위험 감지)에서 중요한 역할을 합니다.