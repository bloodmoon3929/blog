# Cloudflare Tunnel로 퀵 배포 가이드

## 🎯 목표
Windows에서 작업한 Quartz 블로그를 OMV 서버에 배포하고 Cloudflare Tunnel로 외부 공개

## ✅ 사전 준비
- [x] OMV 서버 구동 중
- [x] Windows에서 블로그 파일 준비됨
- [x] Cloudflare 계정 및 터널 생성 완료
- [x] 도메인 연결

## 🚀 3단계 배포

### 1단계: 파일 복사 (Windows → NAS)

**방법 1: 명령 프롬프트**
```cmd
xcopy /E /I "C:\Users\gnbup\Desktop\Claude\blog" "\\GNBUPI\500gssd(1)\quartz-blog"
```

**방법 2: 파일 탐색기**
1. `\\GNBUPI\500gssd(1)` 열기
2. `C:\Users\gnbup\Desktop\Claude\blog` 폴더를 드래그 앤 드롭
3. 폴더명을 `quartz-blog`로 변경

### 2단계: OMV에서 Docker Compose 실행

1. OMV 웹 브라우저 접속
2. **Services** → **Compose** → **Files**
3. **+ Add** 클릭
4. 입력:
   ```
   Name: quartz-blog
   File: /srv/dev-disk-by-uuid-f17a6113-d906-465d-b0c2-67916b2feb5f/500gssd(1)/quartz-blog/docker-deployment/docker-compose.yml
   ```
5. **Save** → **Up** 클릭

### 3단계: Cloudflare에서 라우팅 설정

1. [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/) 접속
2. **Networks** → **Tunnels** → 본인의 터널 선택
3. **Public Hostname** 탭
4. **Add a public hostname** 클릭
5. 입력:
   ```
   Subdomain: blog
   Domain: (본인 도메인 선택)
   Type: HTTP
   URL: quartz-blog:8080
   ```
6. **Save hostname**

완료! 🎉

## 🌐 접속

- **내부**: http://OMV-IP:8090
- **외부**: https://blog.yourdomain.com

## 🔍 상태 확인

### OMV 웹에서
- **Compose** → `quartz-blog` → **Logs** 확인

### 정상 동작 로그 예시
```
Quartz logs:
Started Quartz build server on port 8080

Cloudflared logs:
INF Registered tunnel connection
INF Connection established
```

## ⚠️ 문제 해결

| 문제 | 해결 |
|------|------|
| 컨테이너가 시작 안 됨 | **Logs** 확인 후 **Down** → **Up** |
| Cloudflare 연결 안 됨 | URL을 `localhost:8090` 대신 `quartz-blog:8080` 사용 |
| 빌드 실패 | **Down** → **Build** → **Up** |
| 포트 충돌 | `docker-compose.yml`에서 8090을 다른 포트로 변경 |

## 📝 주의사항

1. **Cloudflare URL 설정**: 반드시 `quartz-blog:8080` 사용 (Docker 네트워크 내부)
2. **빌드 시간**: 처음 실행 시 5-10분 소요
3. **볼륨**: 빌드 결과물은 Docker 볼륨에 저장됨

## 🔄 업데이트 방법

### 콘텐츠 업데이트
1. Obsidian → Blog Sync → GitHub Push
2. NAS에서 Git Pull:
   ```bash
   cd /srv/.../quartz-blog
   git pull
   ```
3. OMV에서 **Down** → **Up**

### 또는 SMB로 직접 수정
1. `\\GNBUPI\500gssd(1)\quartz-blog` 열기
2. 파일 수정
3. OMV에서 컨테이너 재시작
