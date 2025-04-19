// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"

// @ts-ignore
import googleAdsScript from "./scripts/googleads.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return (
    <div id="quartz-body">
      {children}
      <script dangerouslySetInnerHTML={{ __html: `
        // SPA 내비게이션 재정의
        document.addEventListener('nav', function(e) {
          // 내비게이션 이벤트에서 URL 가져오기
          const targetUrl = e.detail.url;
          console.log('Navigation to', targetUrl, 'detected');
          
          // 약간의 지연 후 강제 새로고침
          setTimeout(function() {
            // 현재 위치와 비교하여 변경 사항이 있는 경우에만 새로고침
            if (location.pathname !== '/' + targetUrl) {
              console.log('Forcing page refresh for ads to work properly');
              location.href = '/' + targetUrl;
            }
          }, 100);
        });
      ` }}></script>
    </div>
  )
}

Body.afterDOMLoaded = `
${clipboardScript}
${googleAdsScript}
`
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor