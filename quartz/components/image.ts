import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"

const Image: QuartzComponent = ({ fileData, displayClass }) => {
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = "/static/icon" // 아이콘 경로 설정

  return `
    <img
      src="${iconPath}" 
      alt="아이콘 설명"
      class="${classNames(displayClass, 'image')}"
      onclick="window.location.href='${baseDir}'" />
  `
}

Image.css = `
.image {
  cursor: pointer;
  width: 50px; /* 원하는 크기 */
  height: 50px; /* 원하는 크기 */
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
`

export default (() => Image) satisfies QuartzComponentConstructor
