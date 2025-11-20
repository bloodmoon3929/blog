# Enum
## 열거형(Enum)이란?
- 상수(Constant)들의 집합을 하나의 독립적인 타입(Type) 으로 정의한 것
- 잘못된 값이 할당되는 것을 방지(타입 안정성 확보)
- switch-case, 비교, 값 검증 등을 간결하게 만듦

## Enum의 목적
- 상수들을 그룹화 → 코드 가독성 상승
- 값의 의미 명확화 → 유지보수 용이
- 정해진 값 외에는 사용 불가 → 버그 감소

## 기본 사용 예시 (Java 기준)
```java
public enum OrderStatus {
    PENDING,
    PAID,
    SHIPPED,
    CANCELLED
}
```

사용:
```java
OrderStatus status = OrderStatus.PAID;

if (status == OrderStatus.PAID) {
    // 결제된 주문 처리
}
```

## Enum에 추가 속성/메서드 정의하기

Enum은 단순 상수 나열 이상의 기능을 가짐.
필드, 생성자, 메서드를 가질 수 있으며 객체처럼 동작함.

```java
public enum ErrorCode {
    NOT_FOUND(404, "리소스를 찾을 수 없습니다."),
    UNAUTHORIZED(401, "인증 실패"),
    SERVER_ERROR(500, "서버 오류");

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() { return code; }
    public String getMessage() { return message; }
}
```

사용:
```java
ErrorCode err = ErrorCode.NOT_FOUND;
err.getCode();      // 404
err.getMessage();   // "리소스를 찾을 수 없습니다."
```
## Enum의 특징
1. 타입 안정성(Type Safety)
>예를 들어 "MALE", "FEMALE" 같은 문자열 비교 대신 Enum을 사용하면 오탈자 위험이 사라짐.

2. 이름 기반 비교 보장
>status == OrderStatus.PAID
>
>같이 Reference 비교를 그대로 사용해도 안전함.

3. Singleton 성격
>Enum의 각 값은 하나의 유일한 객체(singleton).

4. switch문 가능
```java
switch (status) {
    case PAID: ...
    case CANCELLED: ...
}
```

5. 직렬화 시 안정적 (Java 기준)
>Enum은 JVM에서 특별하게 다뤄져 보안/직렬화에 안정성이 높음.

## Enum의 고급 기능
### Enum 메서드 오버라이딩
특정 Enum 값마다 동작을 다르게 할 수 있음.

```java
public enum Operation {
    PLUS {
        public int apply(int x, int y) { return x + y; }
    },
    MINUS {
        public int apply(int x, int y) { return x - y; }
    };

    public abstract int apply(int x, int y);
}
```

### Enum 내부에서 인터페이스 구현 가능
```java
public enum Role implements PermissionCheck {
    ADMIN, USER;

    @Override
    public boolean hasPermission() {
        return this == ADMIN;
    }
}
```

### 문자열을 Enum으로 변환
```java
OrderStatus status = OrderStatus.valueOf("PAID");
```
문자열이 Enum과 맞지 않으면 예외 발생.

### Enum → Map 변환하여 속도 최적화 가능
```java
private static final Map<Integer, ErrorCode> map =
    Arrays.stream(values()).collect(Collectors.toMap(ErrorCode::getCode, e -> e));

public static ErrorCode from(int code) {
    return map.get(code);
}
```

## Enum을 사용해야 하는 경우
### 상태/타입이 제한된 경우
- 주문 상태
- 회원 권한
- 결제 수단
- 파일 타입
- 로그 레벨(LogLevel)

### 의미 있는 상수를 관리해야 하는 경우
- HTTP 상태 코드
- 에러 코드
- 고정 옵션 값
- 시스템 설정 키

### switch-case 기반 분기 로직이 필요한 경우
- 전략 전환
- 정책 변경
- 계산 방식

## DTO, Entity 등에서 활용 방안
### DTO에서 값 매핑 시
```java
class OrderRequest {
    private OrderStatus status;
}
```

### Entity에 직접 Enum 저장 가능
JPA 기준:
```
@Enumerated(EnumType.STRING)
private OrderStatus status;
```

### Service에서 분기 처리
```
switch(order.getStatus()) {
    case PAID → 배송 처리
    case CANCELLED → 환불 처리
}
```

## 장점과 단점
### 장점
- 타입 안정성
- 읽기 쉬운 코드
- 상수 관리가 쉬움
- 값 제한 가능
- 유지보수 편의성 높음
- 추가 정보(필드/메서드) 확장 가능

### 단점
- 값 추가 시 컴파일 필요 (DB 테이블과 다르게 동적 변경 불가)
- Enum이 과도하게 복잡해지면 유지보수가 어려워짐
- 값마다 로직을 다르게 하면 Enum 자체가 비대해짐
- 문자열 변환 시 예외 처리 필요

## Enum vs static final 상수 비교
|비교 대상|Enum|static final|
|---------|----|------------|
|타입 안전성|매우 높음|없음 (오탈자 위험)|
|의미 표현|명확|제한적|
|메서드/필드|가능|불가능|
|switch 사용|가능|가능|
|허용 범위 제한|가능|불가능|
|유지보수|우수|상수 증가 시 혼란|