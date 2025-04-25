import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"

const Image: QuartzComponent = ({ fileData, displayClass }) => {
  const baseDir = pathToRoot(fileData.slug!) // pageTitle과 같은 방식으로 root path로 돌아가기

  return (
    <img
      src="/icon.png" // 고정된 아이콘 경로
      alt="아이콘 설명"
      class={classNames(displayClass, "image")}
      onClick={() => window.location.href = baseDir} // 클릭 시 페이지 이동
    />
  )
}

Image.css = `
.image {
  cursor: pointer;
  width: 50px; /* 원하는 크기로 설정 */
  height: 50px; /* 원하는 크기로 설정 */
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
`

export default (() => Image) satisfies QuartzComponentConstructor
