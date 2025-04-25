import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        repo: "bloodmoon3929/blog",
        repoId: "R_kgDOORgWig",
        category: "General",  // 실제 GitHub Discussions 카테고리 이름
        categoryId: "DIC_kwDOORgWis4Cop9Z",  // 실제 카테고리 ID로 교체하세요
        mapping: "pathname",
        strict: false,
        reactionsEnabled: true,
        inputPosition: "top"
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    /*
    Component.PageTitle(),
    Component.Image(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    */
    Component.MobileOnly(
      Component.Flex({
        direction: "column", // 모바일에서는 세로로 배치
        components: [
          Component.Flex({
            direction: "row", // 그룹1은 가로로 배치
            components: [
              { Component: Component.Image() },
              { Component: Component.PageTitle() },
              { Component: Component.Spacer() },
            ],
          }),
          { Component: Component.Spacer() }, // 그룹1과 그룹2 사이에 여백을 두기 위한 Spacer
          Component.Flex({
            direction: "row", // 그룹2는 가로로 배치
            components: [
              { Component: Component.Search(), grow: true },
              { Component: Component.Darkmode() },
            ],
          }),
        ],
      })
    ),
    Component.DesktopOnly(
      Component.Flex({
        components: [
          Component.PageTitle(),
          Component.Image(),
          Component.Flex({
            components: [
              { Component: Component.Search(), grow: true },
              { Component: Component.Darkmode() },
            ],
          }),
        ],
      }),
    ),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.Image(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
