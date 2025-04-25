import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"
import { h } from "preact" // Preact의 createElement 함수

const Image: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)

  const iconPath = "/static/icon.png" 


  return (
    <img
      src={iconPath}
      alt="개발하는 사카밤바피스"
      class={classNames(displayClass, 'image')}
      onClick={() => window.location.href = baseDir}
    />
  )
}

Image.css = `
.image {
  cursor: pointer;
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image:hover {
  transform: scale(1.05);
}

.image:active {
  transform: scale(0.95);
}
`

export default (() => Image) satisfies QuartzComponentConstructor
