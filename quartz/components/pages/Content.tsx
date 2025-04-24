import { useEffect } from 'preact/hooks';
import { ComponentChildren } from "preact";
import { htmlToJsx } from "../../util/jsx";
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types";

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren;
  const classes: string[] = fileData.frontmatter?.cssclasses ?? [];
  const classString = ["popover-hint", ...classes].join(" ");

  useEffect(() => {
    // 광고 갱신 (광고 스크립트가 로드되었을 때 갱신)
    const intervalId = setInterval(() => {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }, 1000); // 광고 갱신을 위한 1초마다 체크
    
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
  }, [fileData, tree]); // 콘텐츠가 변경될 때마다 광고 갱신

  return (
    <article class={classString}>
      {content}
      <ins class="adsbygoogle"
          style="display:block; text-align:center;"
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-9389715933657453"
          data-ad-slot="9562619076"></ins>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9389715933657453"
          crossorigin="anonymous"></script>
    </article>
  );
}

export default (() => Content) satisfies QuartzComponentConstructor;
