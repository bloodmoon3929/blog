# Junit
우테코에서 요구한 TDD을 하기 위해서 사용한 테스트 케이스를 위한 코드이다. 사용법은 다음과 같다.

## 기본 애너테이션
### @Test
일반적인 단일 테스트.

### @DisplayName
테스트 의도를 한글로 명확하게 설명하는 데 사용.

```java
@DisplayName("숫자 입력 테스트")
@Test
void testInput() { ... }
```

### @BeforeEach
각 테스트 실행 전 공통 세팅.

```java
@BeforeEach
void setup() {
    testNumbers = new WinningNumbers("1,2,3,4,5,6");
}
```

### @Nested
논리적으로 테스트 그룹을 묶을 때 사용.

```java
@Nested
@DisplayName("Lotto 생성 테스트")
class DescribeConstructor { ... }
```

## ParameterizedTest
### @ParameterizedTest + @ValueSource
간단한 반복 입력 테스트.

```java
@ParameterizedTest
@ValueSource(strings = {"7", "8", "9"})
@DisplayName("숫자 입력")
void testNumbers(String value) { ... }
```

### @MethodSource
복잡한 값이나 여러 파라미터 전달 시 사용.

```java
@ParameterizedTest
@MethodSource("normalNumbers")
void testNormalNumbers(List<Integer> inputs) {
    assertThat(new Lotto(inputs).getNumbers())
        .containsExactly(1, 2, 3, 4, 5, 6);
}
```

## 예외 테스트
### assertThatThrownBy
예외가 발생해야 하는 경우.

```java
assertThatThrownBy(() -> new Lotto(List.of(1,2,3,4,5,6,7))).isInstanceOf(IllegalArgumentException.class);
```

### assertThatIllegalArgumentException()
AssertJ가 제공하는 더 간결한 문법.

```java
assertThatIllegalArgumentException()
    .isThrownBy(() -> validator.parseNumber(data))
    .withMessageContaining(
        ErrorMessage.ERROR.getMessage()
        + ErrorMessage.NOTNUMBER.getMessage()
    );
```

### assertThatCode().doesNotThrowAnyException()
예외가 발생하지 않아야 하는 경우.

```java
assertThatCode(() -> new Lotto(inputs))
        .doesNotThrowAnyException();
```

## 값 검증 AssertJ 예시
### 범위 테스트
```java
assertThat(number).isBetween(0, 9);
```

### 값 정확히 일치
```java
assertThat(lotto.getNumbers())
        .containsExactly(1, 2, 3, 4, 5, 6);
```

## 우테코 전용 테스트 유틸 사용
### assertSimpleTest
CLI 기반 미션에서 예외 메시지 검증.

```java
assertSimpleTest(() -> {
    runException("0");
    assertThat(output()).contains("[ERROR]");
});
```

### assertRandomNumberInRangeTest
랜덤 값이 정해진 순서대로 나오도록 하는 테스트.

```java
assertRandomNumberInRangeTest(
    () -> {
        int[] result = generator.returnArray(6);
        assertThat(result).containsExactly(1, 2, 3, 4, 5, 5);
    },
    1, 2, 3, 4, 5, 5
);
```

## 그 외
### @DisplayNameGeneration
테스트 이름 자동 생성 전략 지정.

```java
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class LottoTest { ... }
```

→ 메서드 이름을 "언더바 -> 공백"으로 예쁘게 변환.

### @BeforeAll
클래스 전체에서 한 번만 초기화할 값이 있을 때.

```java
@BeforeAll
static void init() { ... }
```

### Custom Assertion 만들기
테스트 가독성 향상을 위해 AssertJ extension 만들기도 좋음.

```java
public class LottoAssert extends AbstractAssert<LottoAssert, Lotto> {
    public LottoAssert hasSize(int size) {
        isNotNull();
        if (actual.getNumbers().size() != size) {
            failWithMessage("Lotto size expected %d but was %d", size, actual.getNumbers().size());
        }
        return this;
    }
}
```

### ParameterizedTest에 CsvSource 추가
두 개 이상 파라미터를 간단히 전달할 수 있음.

```java
@ParameterizedTest
@CsvSource({
    "1, true",
    "2, false"
})
void testCsv(int input, boolean expected) { ... }
```

### TDD 스타일의 Given/When/Then 구조
가독성이 좋아짐

```java
// given
Lotto lotto = new Lotto(List.of(1,2,3,4,5,6));

// when
int bonus = lotto.calculateBonus();

// then
assertThat(bonus).isEqualTo(0);
```

## 최종 요약

우테코에서 JUnit + AssertJ 테스트 작성 시 다음을 많이 사용한다:

JUnit 기본 구조
@Test, @DisplayName, @Nested, @BeforeEach

파라미터 테스트
@ParameterizedTest, @ValueSource, @MethodSource

예외 테스트
assertThatThrownBy, assertThatIllegalArgumentException, assertThatCode

AssertJ 검증 문법
containsExactly, isBetween, isEqualTo

우테코 미션 제공 테스트 유틸
assertSimpleTest, assertRandomNumberInRangeTest

추가로 사용하면 좋은 것들
@BeforeAll, @DisplayNameGeneration, CsvSource, custom assertion, Given/When/Then 패턴