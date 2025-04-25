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
    // Mobile에서는 PageTitle과 Image를 가로로 배치
    Component.MobileOnly(
      Component.Flex({
        direction: 'row', // 가로 배치
        components: [
          { Component: Component.PageTitle() },
          { Component: Component.Image() },
        ],
      })
    ),

    // Desktop에서는 PageTitle과 Image를 세로로 배치
    Component.DesktopOnly(
      Component.Flex({
        direction: 'column', // 세로 배치
        components: [
          { Component: Component.PageTitle() },
          { Component: Component.Image() },
        ],
      })
    ),

    // Mobile에서 Search와 Explorer를 가로로 배치
    Component.MobileOnly(
      Component.Flex({
        direction: 'row', // 가로 배치
        components: [
          { Component: Component.Search() },
          { Component: Component.Explorer() },
        ],
      })
    ),

    // Desktop에서는 Search와 Explorer를 세로로 배치
    Component.DesktopOnly(
      Component.Flex({
        direction: 'column', // 세로 배치
        components: [
          { Component: Component.Search() },
          { Component: Component.Explorer() },
        ],
      })
    ),
  ],
  /*
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
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}
*/

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
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
