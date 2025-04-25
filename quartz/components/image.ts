/** @jsx h */
import { h } from "preact"
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"

const Image: QuartzComponent = ({ fileData, displayClass }) => {
  const baseDir = pathToRoot(fileData.slug!)

  // Quartz에서 경로 문제를 피하려면 올바른 경로 지정이 필요
  const iconPath = "/static/icon" // /static 폴더 내 경로로 아이콘 설정

  return (
    <img
      src={iconPath} // 고정된 아이콘 경로
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
