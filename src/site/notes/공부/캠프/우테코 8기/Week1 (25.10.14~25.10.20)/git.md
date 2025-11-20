# git
Git은 분산 버전 관리 시스템으로, 소스 코드의 변경 사항을 효율적으로 기록하고 여러 개발자와 협업할 수 있게 해주는 도구이다.

Git은 로컬 저장소와 원격 저장소를 기반으로 하며, 브랜치를 쉽게 생성하고 병합할 수 있어 복잡한 프로젝트를 체계적으로 관리할 수 있다.

## Git 기본 개념
### Repository
- 로컬 저장소(Local Repository): 자신의 PC에 존재하는 저장소
- 원격 저장소(Remote Repository): GitHub/GitLab 등 서버에 존재하는 저장소

### Commit
- 코드의 스냅샷을 저장하는 단위
- 변경 내용을 메시지와 함께 기록

### Branch
- 독립적인 작업 공간
- 대표적으로 main/master, develop, feature/*, fix/* 등이 있다.

### Merge & Rebase
- Merge: 두 브랜치를 합치며 기록을 유지
- Rebase: 기록을 일렬로 재정렬하여 히스토리를 깔끔하게 유지

## Git 커밋 메시지 규칙 (AngularJS 스타일 기반)
가장 널리 쓰이는 커밋 규칙으로 다음과 같이 구성된다.
```text
<type>(optional scope): <subject>

<body>

<footer>
```

### type 종류
|type|설명|
|----|----|
|feat|새로운 기능 추가|
|fix|버그 수정|
|docs|문서 변경|
|style|포맷팅, 세미콜론, 공백—기능 변경 없음|
|refactor|기능 변화 없이 코드 구조 개선|
|test|테스트 코드 추가/수정|
|chore|빌드, 패키지 관리 등 기타 작업|
|build|빌드 시스템 또는 외부 종속성 변경|
|ci|CI 설정 변경|
|perf|성능 개선|
|revert|이전 커밋 되돌리기|

## <subject>, <body>, <footer> 예시
### 예시 1 — feat
```
feat: 사용자 프로필 이미지 업로드 기능 추가

사용자가 마이페이지에서 프로필 이미지를 업로드할 수 있도록 기능을 구현했습니다.
이미지 유효성 검사(파일 크기, 확장자)와 예외 처리 로직을 추가했습니다.

Resolves: #102
```

### 예시 2 — fix
```
fix: 로그인 시 토큰이 갱신되지 않는 문제 해결

JWT 토큰이 만료 직전일 때 자동 갱신 로직이 동작하지 않는 문제를 수정했습니다.
Interceptor 내부에서 null 토큰 전달 케이스를 처리하도록 개선했습니다.

Fixes: #88
```

### 예시 3 — docs
```
docs: API 사용 방법 문서 최신화

회원가입 및 로그인 API의 요청/응답 예시를 최신 버전 기준으로 업데이트했습니다.
Swagger 문서 링크도 새 주소로 변경했습니다.

Refs: #120
```

### 예시 4 — refactor
```
refactor: 주문 생성 로직 구조 개선

중복되는 검증 로직을 Validator 클래스로 분리하고,
서비스의 함수 길이를 줄여 가독성을 높였습니다.

No-issue
```

### 예시 5 — test
```
test: 결제 서비스 유닛 테스트 추가

결제 승인/취소 로직에 대한 유닛 테스트를 작성했습니다.
Mock을 사용해 PG사 호출을 시뮬레이션했습니다.

Related-to: #140
```

### 예시 6 — build
```
build: Gradle JDK 버전 17로 업데이트

프로젝트 전체 빌드 환경을 JDK 17 기준으로 업그레이드했습니다.
호환되지 않는 라이브러리 버전도 함께 수정했습니다.

BREAKING CHANGE: JDK 11 이하 환경에서는 빌드가 불가능합니다.
```

## 좋은 Git 커밋 메시지 작성 원칙
- 제목(Subject)은 50자 내외로 간결하게
- 명령형 사용
>“추가한다” ❌

>“추가” “Add” ⭕

- 본문(Body)은 무엇을 / 왜 했는지를 중심으로
- 관련 이슈는 footer에 기록
- 하나의 커밋에는 하나의 목적만

## Git 브랜치 전략 (간단 정리)
### Git Flow
- main
- develop
- feature/*
- release/*
- hotfix/*

대규모 팀 프로젝트에서 유용.

### GitHub Flow
- main + feature/*

Pull Request 위주의 간단한 브랜치 전략.

### Trunk Based Development
- main에서 직접 짧은 사이클로 작업 후 머지

CI/CD 환경에서 자주 사용.

7. 자주 사용하는 Git 명령어
기본
```
git init
git clone <repo>
git status
git add .
git commit -m "message"
git push
```

브랜치
```
git branch
git branch <name>
git checkout <branch>
git switch <branch>
git merge <branch>
```

되돌리기
```
git restore .
git reset --soft <hash>
git reset --hard <hash>
git revert <hash>
```

## 실무에서의 Git Commit Best Practices
- 커밋 단위를 잘게 쪼개라
- PR은 작게, 리뷰는 빠르게
- 기능 하나당 브랜치 하나
- 의미 있는 기록 남기기 (작업 과정 로그처럼 쓰지 않기)
- 릴리즈 노트를 위한 태그 활용

## 우테코(WoowaCourse) Git 활용 가이드

우테코에서는 기능 구현을 위한 브랜치 전략과 Pull Request 제출 방식을 명확히 규정하고 있다.
아래는 그 흐름을 단계별로 정리한 안내이다.

### 브랜치 생성
본인의 깃허브 아이디로 브랜치를 생성하여 작업한다.
```
git checkout -b bloodmoon3929
```

### 기능 구현 후 add / commit
수정된 파일을 확인하고 커밋을 생성한다.
```
git status
git add -A
git commit -m "{원하는 메시지}"
```

커밋 메시지는 Angular 스타일이나 팀 규칙을 따른다.

>예: feat: 회원가입 검증 로직 추가

### 브랜치 병합 (A 브랜치에 B의 내용을 병합)
다른 브랜치를 현재 브랜치로 가져와 반영한다.
```
git checkout A
git merge B
```

>예: main에 feature/login 병합 등

### GitHub에 업로드(push)
작성한 브랜치를 원격 저장소로 push 한다. 이때, 메인 브랜치나 master 브랜치가 아닌 본인의 깃허브 이름 브랜치를 업로드 해야 한다.

git push origin bloodmoon3929

### 과제 제출(Pull Request 생성)
GitHub 리포지토리에서 본인이 작업한 브랜치 오른쪽의 "New pull request" 버튼 클릭

PR 제목 형식:
>[미션제목] 이름 미션 제출합니다.


예시:
>[자동차 경주 게임] 김상우 미션 제출합니다.


PR 주소(URL)를 복사하여
https://apply.techcourse.co.kr/applications/me

제출란에 입력 후 제출