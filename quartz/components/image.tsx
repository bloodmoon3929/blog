import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"

const Image: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)

  const iconPath = "/static/icon.png" 


  return (
    <a href={baseDir} style={{ display: "inline-block" }}>
      <img
        src="/blog/img/user/첨부파일/icon.png"
        alt="개발하는 사카밤바피스"
        class={classNames(displayClass, 'image')}
      />
    </a>
  )
}

Image.css = `
.image {
  cursor: pointer;
  width: 150px; 
  height: 150px; 
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image:hover {
  transform: scale(1.05);
}

.image:active {
  transform: scale(0.95);
}


@media (max-width: 768px) {
  .image.mobile-only {
    width: 100px !important;
    height: 100px !important;
  }
}

`



export default (() => Image) satisfies QuartzComponentConstructor
