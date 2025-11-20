# DDD
DDD는 복잡한 도메인을 명확히 표현하고, 비즈니스 규칙을 코드 구조의 중심에 두는 설계 방식이다.
구성은 크게 Presentation → Application → Domain → Infrastructure 계층으로 나뉜다.

## DDD의 중요 개념
- 도메인(Domain): 소프트웨어가 해결하려는 비즈니스 영역이나 문제 공간.
- 유비쿼터스 언어(Ubiquitous Language): 팀 내 모든 구성원이 공통으로 사용하는 언어로, 도메인 모델과 소통을 일관되게 유지.
- 바운디드 컨텍스트(Bounded Context): 도메인을 여러 개의 독립된 컨텍스트로 분리하여 복잡성을 관리.
- 애그리거트(Aggregate): 도메인 모델 내에서 일관성을 유지해야 하는 객체들의 집합.
- 루트 애그리거트(Root Aggregate): 애그리거트의 진입점이 되는 핵심 엔티티.
- 벨류 오브젝트(Value Object): 식별자가 필요 없는 객체로, 속성만으로 식별됨.
- 엔티티(Entity): 고유한 식별자를 가지며, 지속적인 생명주기를 가진 도메인 객체.

### 1. Presentation Layer (UI 계층)
#### 역할
- 사용자의 입력을 받고 결과를 반환
- Application Service를 호출하여 처리 흐름을 시작함

#### 구성 요소
**Controller**
- HTTP 요청/응답 처리
- DTO 매핑
- 비즈니스 로직 없음

**DTO (Request / Response)**
- 계층 간 데이터 전달 객체
- 검증 및 단순 변환만 수행
- 도메인 지식 포함 X

### 2. Application Layer (애플리케이션 계층)
#### 역할
- 유즈케이스(Use Case) 실행
- 도메인 객체를 조립하고 트랜잭션 경계를 관리
- 도메인 규칙은 포함하지 않음 (흐름만 제어)

#### 구성 요소
**Application Service**
- Controller → Application Service → Domain 객체 호출 흐름 구성
- 예: 주문 생성, 사용자 등록 프로세스 처리

**Command / Query (옵션, CQRS 기반)**
- Command: 상태 변경
- Query: 데이터 조회

### 3. Domain Layer (도메인 계층)
#### 역할
DDD의 핵심.
비즈니스 규칙, 모델, 정책을 모두 포함하며 어떤 기술에도 의존하지 않아야 함.
#### 구성 요소
**Entity**
- 고유 ID를 가지고 상태 + 행동을 가진 객체
- 예: Order, User

**Value Object**
- 식별자 없음, 속성 기반 비교
- 불변성 유지
- 예: Money, Address

**Aggregate & Aggregate Root**
- 불변성을 유지해야 하는 객체 그룹
- Root 외부에서는 내부 객체에 직접 접근 불가

**Domain Service**
- 특정 Entity에 속하지 않는 도메인 규칙 처리
- 무상태(stateless)

**Repository Interface**
- 도메인 계층에서 영속성 기술을 추상화한 인터페이스 선언

**Domain Event**
- 도메인 내 의미 있는 사건 표현 (예: 주문 생성됨)

### 4. Infrastructure Layer (인프라 계층)
#### 역할
- 기술적 구현부 (DB, Network, File, 외부 API 등)

#### 구성 요소
**Repository 구현체**
- Repository 인터페이스의 실제 구현
- 예: JPA 기반 구현

**외부 API 연동**
- RestTemplate, WebClient 등 호출

**설정 / 구성 요소**
- ORM 설정
- 메시지 브로커, Redis, Kafka 등

### 전체 구조 요약 (디렉토리 예시)
```text
presentation/
 └─ controller/
 └─ dto/

application/
 └─ service/
 └─ command/
 └─ query/

domain/
 └─ entity/
 └─ vo/
 └─ service/
 └─ repository/
 └─ event/
 └─ aggregate/

infrastructure/
 └─ repository/
 └─ external/
 └─ config/
```

## DDD vs MVC 구조 비교
구조 차이 개요 표
|구분|MVC|DDD|
|---|----|---|
|목적|빠른 개발, 화면 중심|도메인 복잡도 관리, 비즈니스 중심|
|주요 관심사|UI 흐름 제어|도메인 모델링, 규칙 중심|
|계층 구성|Model, View, Controller|Presentation, Application, Domain, Infrastructure|
|Model 역할|DB 매핑 + 비즈니스 로직 혼재|Domain Entity/VO/Service로 역할 분리|
|서비스 레이어|필수 아님|Application Service + Domain Service로 명확 분리|
|DTO 필요성|경우에 따라 생략 가능|필수적 (계층 간 책임 분리)|
|일관성|상대적으로 느슨함|Aggregate 중심 강한 일관성|

		
## DDD의 장점과 단점
### 장점
1. 복잡한 도메인 표현에 강함
    - 비즈니스 규칙이 코드 구조에 반영됨
    - 유지보수 시 규칙 이해가 쉬움

2. 변경에 강한 구조
    - UI, DB 기술이 바뀌어도 Domain은 영향받지 않음
    - 확장성 ↑

3. 팀 간 협업 향상
    - 도메인 언어(Ubiquitous Language)를 통해 동일 용어 사용 가능

4. 테스트 용이
    - Domain이 순수 로직만 담고 있기 때문에 단위 테스트 쉬움

### 단점
1. 설계 비용이 높음
    - 모델링 회의, Aggregate 설계, 이벤트 설계 등
    - 소규모 프로젝트에는 과할 수 있음

2. 학습 난이도
    - DDD 개념(VO, Aggregate, Event 등)을 모두 이해해야 효과적

3. 계층 분리로 초기 개발 속도 저하
    - 파일/클래스 갯수 증가
    - 단순 CRUD에서는 비효율적일 수 있음

## MVC 대비 DDD를 선택해야 할 시점
### DDD가 적합한 경우
- 도메인 규칙이 복잡하거나 자주 바뀜
- 금융, 결제, 유통, 정책 기반 시스템
- 장기 운영을 전제로 한 서비스

### MVC 또는 단순 구조가 적합한 경우
- 단순 CRUD 위주의 시스템
- MVP 단계, 빠른 출시가 최우선
- 도메인 규칙이 거의 없음