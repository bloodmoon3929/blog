import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="notfound-container">
      <h1>404</h1>
      <img src="/blog/static/404.png" alt="404 이미지" class="notfound-image" />
      <p class="notfound-message">
        현재 이 페이지는 만들어지지 않았어요,<br/>
        다음에 오실때 까지 사카밤바피스가 열심히 만들어 둘게요
      </p>
      <a href={baseDir} class="home-link">홈으로 돌아가기</a>
    </article>
  )
}

NotFound.css = `
.notfound-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
}

.notfound-image {
  width: 300px;
  height: auto;
  margin-bottom: 2rem;
}

.notfound-message {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.home-link {
  font-size: 1.2rem;
  text-decoration: none;
  color: #3498db;
  border: 1px solid #3498db;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.home-link:hover {
  background-color: #3498db;
  color: white;
}
`

export default (() => NotFound) satisfies QuartzComponentConstructor
