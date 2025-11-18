# Quartz Blog - Load Balanced Deployment

OMV NAS에서 Quartz 블로그를 GitHub Pages와 로컬 서버 간 로드 밸런싱하여 배포

## 🏗️ 아키텍처

```
외부 접속 (DuckDNS :2052)
    ↓
Nginx Load Balancer
    ├─ 50% → GitHub Pages (https://bloodmoon3929.github.io/blog)
    └─ 50% → 로컬 Quartz (Docker)
```

### Session Sticky
- IP 해시 기반 분배
- 같은 사용자는 항상 같은 서버로 연결
- 이미지/CSS 깨짐 방지

## 📁 파일 구조

```
/srv/dev-disk-by-uuid-.../500gssd(1)/quartz-blog/
├── docker-deployment/
│   ├── docker-compose.yml    # Docker Compose 설정
│   ├── nginx-lb.conf         # Nginx 로드 밸런서 설정
│   └── README.md            # 이 파일
├── src/                     # Quartz 소스
├── quartz/
├── package.json
└── ...
```

## 🚀 배포 방법

### 1. 파일 복사 (Windows → NAS)

```cmd
xcopy /E /I "C:\Users\gnbup\Desktop\Claude\blog" "\\GNBUPI\500gssd(1)\quartz-blog"
```

### 2. Docker Compose 실행 (OMV)

SSH로 접속:
```bash
cd /srv/dev-disk-by-uuid-f17a6113-d906-465d-b0c2-67916b2feb5f/500gssd\(1\)/quartz-blog/docker-deployment

docker-compose up -d
```

### 3. 로그 확인

```bash
# 전체 로그
docker-compose logs -f

# Quartz 로그만
docker logs -f quartz-blog

# Nginx 로그만
docker logs -f nginx-loadbalancer
```

## 🌐 접속

- **내부**: http://gnbupi.local:2052
- **외부**: http://bloodmoon3929.duckdns.org:2052

## 🔧 구성 요소

### Quartz Blog
- **컨테이너**: `quartz-blog`
- **이미지**: `node:22-slim`
- **내부 포트**: 8080 (localhost만)
- **역할**: Quartz 정적 사이트 빌드 및 서빙

### Quartz Proxy (socat)
- **컨테이너**: `quartz-proxy`
- **이미지**: `alpine/socat`
- **내부 포트**: 3000
- **역할**: localhost:8080 → 네트워크 접근 가능하게 변환

### Nginx Load Balancer
- **컨테이너**: `nginx-loadbalancer`
- **이미지**: `nginx:alpine`
- **외부 포트**: 2052
- **역할**: GitHub Pages와 로컬 Quartz 간 로드 밸런싱

## 📊 로드 밸런싱 확인

브라우저 개발자 도구:
1. F12 → Network 탭
2. 페이지 로드
3. Response Headers → `X-Backend` 확인:
   - `github` → GitHub Pages
   - `local` → 로컬 Quartz

같은 IP에서는 항상 같은 서버로 연결됩니다!

## 🔄 업데이트 방법

### 블로그 콘텐츠 업데이트

1. **Obsidian → GitHub**
   - Blog Sync 플러그인으로 Push

2. **GitHub → NAS**
   ```bash
   cd /srv/dev-disk-by-uuid-f17a6113-d906-465d-b0c2-67916b2feb5f/500gssd\(1\)/quartz-blog
   git pull origin main
   ```

3. **컨테이너 재시작**
   ```bash
   cd docker-deployment
   docker-compose restart quartz-blog
   ```

### Docker 이미지 업데이트

```bash
cd /srv/dev-disk-by-uuid-f17a6113-d906-465d-b0c2-67916b2feb5f/500gssd\(1\)/quartz-blog/docker-deployment

docker-compose down
docker-compose pull
docker-compose up -d
```

## 🐛 트러블슈팅

### 컨테이너가 시작 안 됨

```bash
# 상태 확인
docker ps -a | grep quartz

# 로그 확인
docker logs quartz-blog
docker logs nginx-loadbalancer
```

### 502 Bad Gateway

**원인**: Quartz가 아직 빌드 중
```bash
# Quartz 로그 확인
docker logs -f quartz-blog

# "Started a Quartz server" 메시지 기다리기
```

### GitHub Pages만 나옴 / 로컬만 나옴

**정상**: IP 해시 기반이므로 같은 IP는 같은 서버!

**확인**: 다른 기기 또는 VPN으로 테스트

### 포트 충돌

```bash
# 2052 포트 사용 중인 프로세스 확인
sudo netstat -tulpn | grep 2052

# 다른 포트로 변경
# docker-compose.yml에서 "2052:2052" → "다른포트:2052"
```

## 🛑 중지 및 제거

### 컨테이너 중지

```bash
docker-compose stop
```

### 완전 제거 (볼륨 포함)

```bash
docker-compose down -v
```

## 📈 모니터링

### 리소스 사용량

```bash
docker stats quartz-blog quartz-proxy nginx-loadbalancer
```

### 네트워크 확인

```bash
docker network inspect quartz-network
```

## ⚙️ 설정 변경

### 로드 밸런싱 비율 조정

`nginx-lb.conf`:
```nginx
upstream backend {
    hash $remote_addr consistent;
    server 127.0.0.1:8081 weight=3;  # GitHub 75%
    server 127.0.0.1:8082 weight=1;  # Local 25%
}
```

### 랜덤 모드로 변경 (테스트용)

```nginx
upstream backend {
    random;  # IP 해시 대신 랜덤
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
}
```

⚠️ **주의**: 랜덤 모드는 이미지/CSS 깨질 수 있음!

## 🔐 보안

### 방화벽 설정

```bash
# 2052 포트만 허용
sudo ufw allow 2052/tcp
```

### 공유기 포트 포워딩

```
외부 포트: 2052
내부 IP: OMV IP (예: 192.168.0.100)
내부 포트: 2052
프로토콜: TCP
```

## 📚 참고 자료

- [Quartz 공식 문서](https://quartz.jzhao.xyz)
- [Nginx Load Balancing](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html)
- [Docker Compose](https://docs.docker.com/compose/)

---

**마지막 업데이트**: 2025-11-16
**버전**: 1.0.0 (Production)
