// 새로운 파일: quartz/components/scripts/adsense-spa.inline.ts

// AdSense 초기화 상태 추적
let adsenseInitialized = false;
let adsPending = false;

// AdSense 초기화 함수
function initializeAdsense() {
  // 이미 초기화 진행 중이면 중복 실행 방지
  if (adsPending) return;
  adsPending = true;
  
  console.log("Attempting to initialize AdSense...");
  
  // AdSense 초기화 시도 (약간의 지연으로 DOM 업데이트 보장)
  setTimeout(() => {
    if (window.adsbygoogle) {
      try {
        console.log("AdSense object found, initializing...");
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adsenseInitialized = true;
        console.log("AdSense initialized successfully");
      } catch (e) {
        console.error("Error initializing AdSense:", e);
      }
    } else {
      console.log("AdSense not found, loading script...");
      loadAdSenseScript();
    }
    adsPending = false;
  }, 500);
}

// AdSense 스크립트 로드 함수
function loadAdSenseScript() {
  // 이미 스크립트가 존재하는지 확인
  if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
    console.log("AdSense script already exists");
    return;
  }
  
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9389715933657453';
  script.crossOrigin = 'anonymous';
  script.onload = () => {
    console.log("AdSense script loaded");
    setTimeout(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, 200);
  };
  document.head.appendChild(script);
}

// History API 오버라이드하여 SPA 내비게이션 감지 개선
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
  originalPushState.apply(this, arguments);
  console.log("Navigation detected (pushState)");
  adsenseInitialized = false;
  initializeAdsense();
};

history.replaceState = function() {
  originalReplaceState.apply(this, arguments);
  console.log("Navigation detected (replaceState)");
  adsenseInitialized = false;
  initializeAdsense();
};

// 브라우저 내비게이션 감지 (뒤로가기/앞으로가기)
window.addEventListener('popstate', function() {
  console.log("Navigation detected (popstate)");
  adsenseInitialized = false;
  initializeAdsense();
});

// Quartz 내비게이션 이벤트 감지
document.addEventListener("nav", function() {
  console.log("Quartz navigation detected");
  adsenseInitialized = false;
  initializeAdsense();
});

// 페이지 로드 시 초기화
window.addEventListener('load', initializeAdsense);

// DOM 변경 감지를 통한 광고 초기화 (동적으로 광고 컨테이너가 추가될 경우)
const observer = new MutationObserver(function(mutations) {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      // DOM 변경이 감지되면 광고 초기화 시도
      setTimeout(initializeAdsense, 500);
      break;
    }
  }
});

// 문서 관찰 시작
document.addEventListener("DOMContentLoaded", () => {
  observer.observe(document.body, { childList: true, subtree: true });
  initializeAdsense();
});

// 클린업 함수 등록
window.addCleanup && window.addCleanup(() => {
  observer.disconnect();
});

// TypeScript 타입 선언
interface Window {
  adsbygoogle: any[];
}