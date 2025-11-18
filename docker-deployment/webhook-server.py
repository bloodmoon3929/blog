#!/usr/bin/env python3
"""
Quartz Blog Webhook Server
Docker 컨테이너 내에서 실행되어 다른 컨테이너를 재시작합니다.
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import subprocess
import json
import os

# 설정
AUTH_TOKEN = os.getenv('WEBHOOK_TOKEN', 'your-secret-token-here')
PORT = int(os.getenv('WEBHOOK_PORT', '8099'))

class WebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 인증 확인
        auth_header = self.headers.get('Authorization')
        if not auth_header or auth_header != f'Bearer {AUTH_TOKEN}':
            self.send_error(401, 'Unauthorized')
            return
        
        # Docker 재시작
        if self.path == '/restart-docker':
            try:
                print(f"[INFO] Docker restart requested")
                
                # Docker CLI를 통한 재시작
                result = subprocess.run(
                    ['docker', 'restart', 'quartz-blog'],
                    capture_output=True,
                    text=True,
                    timeout=30
                )
                
                success = result.returncode == 0
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    'success': success,
                    'output': result.stdout,
                    'error': result.stderr if not success else None
                }
                
                self.wfile.write(json.dumps(response).encode())
                
                if success:
                    print(f"[SUCCESS] Docker restarted: {result.stdout}")
                else:
                    print(f"[ERROR] Docker restart failed: {result.stderr}")
                
            except subprocess.TimeoutExpired:
                self.send_error(504, 'Gateway Timeout')
                print(f"[ERROR] Docker restart timeout")
            except Exception as e:
                self.send_error(500, str(e))
                print(f"[ERROR] Exception: {e}")
        else:
            self.send_error(404, 'Not Found')
    
    def do_GET(self):
        # Health check
        if self.path == '/health':
            auth_header = self.headers.get('Authorization')
            if not auth_header or auth_header != f'Bearer {AUTH_TOKEN}':
                self.send_error(401, 'Unauthorized')
                return
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok'}).encode())
        else:
            self.send_error(404, 'Not Found')
    
    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")

if __name__ == '__main__':
    # Docker CLI 설치
    print("[INFO] Installing Docker CLI...")
    subprocess.run(['apt-get', 'update'], stdout=subprocess.DEVNULL)
    subprocess.run(['apt-get', 'install', '-y', 'docker.io'], stdout=subprocess.DEVNULL)
    
    try:
        server = HTTPServer(('0.0.0.0', PORT), WebhookHandler)
        print(f'╔═══════════════════════════════════════════════════╗')
        print(f'║   Quartz Blog Webhook Server                      ║')
        print(f'║   Port: {PORT:<42} ║')
        print(f'║   Token: {AUTH_TOKEN[:20]}...{"" if len(AUTH_TOKEN) <= 20 else ""}')
        print(f'║   Endpoints:                                      ║')
        print(f'║     POST /restart-docker - Restart Docker        ║')
        print(f'║     GET  /health         - Health check           ║')
        print(f'╚═══════════════════════════════════════════════════╝')
        print(f'\nServer is running... Press Ctrl+C to stop\n')
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n[INFO] Server stopped')
    except Exception as e:
        print(f'[ERROR] Server error: {e}')
