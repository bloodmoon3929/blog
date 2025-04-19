// static/js/adsense-spa-fix.js

// 광고 초기화 및 표시 수정 함수
function fixAdSenseDisplay() {
  console.log('Fixing AdSense display...');
  
  // 1. Google ESF iframe 찾기 및 수정
  const googleEsfFrame = document.getElementById('google_esf');
  if (googleEsfFrame) {
    googleEsfFrame.style.display = '';
    console.log('Google ESF frame display style reset');
  }
  
  // 2. 모든 AdSense 요소 찾기 및 수정
  const adElements = document.querySelectorAll('.adsbygoogle');
  adElements.forEach(function(el) {
    if (el.style.display === 'none') {
      el.style.display = 'block';
      console.log('AdSense element display reset');
    }
    
    // 상태 확인 및 재초기화
    if (el.getAttribute('data-adsbygoogle-status') !== 'done') {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log('AdSense element reinitialized');
      } catch (e) {
        console.error('Error reinitializing AdSense:', e);
      }
    }
  });
  
  // 3. 캡차 iframe 표시 수정
  const captchaFrames = document.querySelectorAll('iframe[src*="recaptcha"]');
  captchaFrames.forEach(function(frame) {
    if (frame.style.display === 'none') {
      frame.style.display = '';
      console.log('Captcha frame display reset');
    }
  });
}

// 개발자 도구 감지 (일부 광고는 개발자 도구가 열려있을 때 표시되지 않음)
function isDevToolsOpen() {
  const threshold = 160; // 개발자 도구가 열릴 때 일반적인 최소 너비/높이 차이
  
  // 창 크기와 문서 크기 비교로 개발자 도구 열림 감지
  return (window.outerWidth - window.innerWidth > threshold) || 
         (window.outerHeight - window.innerHeight > threshold);
}

// 개발자 도구 상태에 따라 광고 표시 처리
function handleDevToolsState() {
  const devToolsOpen = isDevToolsOpen();
  console.log('Dev tools ' + (devToolsOpen ? 'open' : 'closed'));
  
  // 개발자 도구가 닫혀있을 때만 광고 초기화 시도
  if (!devToolsOpen) {
    // 광고 재초기화
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
      console.log('AdSense reinitialized (dev tools closed)');
    } catch (e) {
      console.error('Error initializing AdSense:', e);
    }
  }
}

// AdSense 스크립트 강제 리로드
function reloadAdSenseScript() {
  // 기존 스크립트 제거
  const oldScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
  if (oldScript) {
    oldScript.remove();
    console.log('Old AdSense script removed');
  }
  
  // 새 스크립트 추가 (캐시 방지를 위한 타임스탬프 추가)
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9389715933657453&t=' + Date.now();
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  console.log('New AdSense script added');
  
  // 스크립트 로드 완료 후 광고 초기화
  script.onload = function() {
    setTimeout(function() {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log('AdSense initialized after script reload');
      } catch (e) {
        console.error('Error initializing AdSense after reload:', e);
      }
    }, 200);
  };
}

// 이벤트 리스너 설정
function setupEventListeners() {
  // 1. 페이지 내비게이션 이벤트
  document.addEventListener('nav', function() {
    console.log('Navigation event detected');
    setTimeout(fixAdSenseDisplay, 300);
    setTimeout(handleDevToolsState, 500);
  });
  
  // 2. 페이지 로드 이벤트
  window.addEventListener('load', function() {
    console.log('Page loaded');
    setTimeout(fixAdSenseDisplay, 1000);
    setTimeout(handleDevToolsState, 1200);
  });
  
  // 3. 리사이즈 이벤트 (개발자 도구 열림/닫힘 감지용)
  window.addEventListener('resize', function() {
    console.log('Window resized');
    setTimeout(handleDevToolsState, 500);
  });
  
  // 4. 가끔씩 광고 상태 확인 (주기적으로)
  setInterval(fixAdSenseDisplay, 30000); // 30초마다
}

// 스크립트 초기화
function init() {
  console.log('AdSense fix script initialized');
  
  // 최초 1회 스크립트 리로드 (필요한 경우)
  if (!window.adsbygoogle) {
    reloadAdSenseScript();
  }
  
  // 이벤트 리스너 설정
  setupEventListeners();
  
  // 첫 실행
  setTimeout(fixAdSenseDisplay, 1000);
  setTimeout(handleDevToolsState, 1200);
}

// 스크립트 실행
init();