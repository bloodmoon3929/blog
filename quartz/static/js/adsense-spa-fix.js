// adsense-spa-fix.js

// AdSense 태그를 페이지에 삽입
function insertAdSenseCode() {
  // 기존 AdSense 스크립트 제거
  const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // 기존 ins 태그 제거
  document.querySelectorAll('ins.adsbygoogle').forEach(ins => ins.remove());
  
  // 새 AdSense 스크립트 삽입
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9389715933657453';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  
  // 자동 광고 태그 삽입
  script.onload = () => {
    // AdSense 초기화
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    console.log("AdSense script reloaded completely");
  };
}

// 페이지 탐색 시 AdSense 재로드
function setupAdSenseReload() {
  // 초기 로드
  document.addEventListener('DOMContentLoaded', insertAdSenseCode);
  
  // Quartz 내비게이션 이벤트
  document.addEventListener('nav', () => {
    console.log('Quartz navigation detected - reloading AdSense');
    setTimeout(insertAdSenseCode, 300);
  });
  
  // History API 오버라이드
  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    console.log('pushState detected - reloading AdSense');
    setTimeout(insertAdSenseCode, 300);
  };
  
  // 뒤로가기/앞으로가기 이벤트
  window.addEventListener('popstate', () => {
    console.log('popstate detected - reloading AdSense');
    setTimeout(insertAdSenseCode, 300);
  });
}

// 실행
setupAdSenseReload();