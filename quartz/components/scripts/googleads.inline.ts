// Google 광고 스크립트를 SPA 내비게이션과 함께 작동하도록 하는 스크립트
// quartz/components/scripts/googleads.inline.ts

// 광고 초기화 함수
function initializeAds() {
  if (typeof window.adsbygoogle !== 'undefined') {
    try {
      // 기존 광고 재초기화
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Google AdSense has been initialized on page navigation");
    } catch (e) {
      console.error("Error initializing Google AdSense:", e);
    }
  } else {
    console.log("AdSense not loaded, attempting to load script");
    
    // 이미 스크립트가 로드되어 있는지 확인
    if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
      console.log("AdSense script already exists, waiting for it to load");
      // 스크립트가 이미 존재하면 잠시 후 다시 시도
      setTimeout(() => {
        if (typeof window.adsbygoogle !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }, 500);
      return;
    }
    
    // 스크립트 추가
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9389715933657453';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      console.log("AdSense script loaded successfully");
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 100);
    };
    document.head.appendChild(script);
  }
}

// 페이지 전환 이벤트에 광고 초기화 연결
document.addEventListener("nav", () => {
  console.log("Navigation event detected, initializing ads");
  // DOM이 업데이트된 후 약간의 지연을 두고 광고 초기화
  setTimeout(initializeAds, 300);
});

// 페이지 첫 로드에도 광고 초기화 - SPA가 아닌 첫 로드 때문
document.addEventListener("DOMContentLoaded", initializeAds);

// TypeScript 타입 선언
interface Window {
  adsbygoogle: any[];
}