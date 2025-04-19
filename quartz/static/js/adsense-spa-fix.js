// static/js/adsense-spa-fix.js

// AdSense iframe 스타일 수정 함수
function fixAdSenseDisplay() {
  // Google ESF iframe 찾기
  const googleEsfFrame = document.getElementById('google_esf');
  
  if (googleEsfFrame) {
    // 스타일 재설정
    googleEsfFrame.style.display = '';
    console.log('Google ESF frame display style reset');
  } else {
    console.log('Google ESF frame not found');
  }
  
  // AdSense 요소들 찾기
  const adElements = document.querySelectorAll('.adsbygoogle');
  
  // 모든 AdSense 요소의 스타일 재설정
  adElements.forEach(function(el) {
    if (el.style.display === 'none') {
      el.style.display = 'block';
      console.log('AdSense element display reset');
    }
  });
}

// 페이지 내비게이션 이벤트 캐치
document.addEventListener('nav', function() {
  console.log('Navigation detected, fixing AdSense display...');
  
  // 약간의 지연 후 광고 표시 수정 (DOM 업데이트 후)
  setTimeout(fixAdSenseDisplay, 300);
});

// 페이지 로드 시에도 실행
window.addEventListener('load', function() {
  // 페이지 로드 시에는 더 긴 지연 필요
  setTimeout(fixAdSenseDisplay, 1000);
});