// components/image.tsx
import { h } from "preact"

interface ImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

export default function Image({ src, alt = "", width, height, className = "" }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-xl shadow-md ${className}`}
    />
  )
}
