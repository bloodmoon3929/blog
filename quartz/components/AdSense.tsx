export function AdSense() {
  return {
    Component: () => ({
      tag: "div",
      attrs: {
        style: "text-align:center; margin: 2em 0;",
      },
      children: [
        {
          tag: "ins",
          attrs: {
            class: "adsbygoogle",
            style: "display:block; text-align:center;",
            "data-ad-layout": "in-article",
            "data-ad-format": "fluid",
            "data-ad-client": "ca-pub-9389715933657453",
            "data-ad-slot": "9562619076",
          },
        },
        {
          tag: "script",
          innerHTML: "(adsbygoogle = window.adsbygoogle || []).push({});",
        },
      ],
    }),
  }
}
