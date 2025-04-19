// adsense-spa-fix.js

// AdSense 초기화 상태 추적
let adsenseInitialized = false;

// 페이지 변경 감지 및 광고 초기화
function initializeAdsense() {
  // 이미 AdSense 스크립트가 있는지 확인
  const hasScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
  
  if (!hasScript) {
    console.log("AdSense 스크립트 추가 중...");
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9389715933657453';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
  
  // 광고 다시 초기화
  setTimeout(function() {
    try {
      console.log("AdSense 초기화 시도 중...");
      (adsbygoogle = window.adsbygoogle || []).push({});
      console.log("AdSense 초기화 완료");
    } catch (e) {
      console.error("AdSense 초기화 실패:", e);
    }
  }, 300);
}

// 페이지 전환 감지
document.addEventListener('nav', function() {
  console.log("페이지 전환 감지됨");
  adsenseInitialized = false;
  initializeAdsense();
});

// 페이지 로드 시 초기화
window.addEventListener('load', initializeAdsense);