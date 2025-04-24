import { FilePath, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"
import { Argv } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"

//const filesToCopy = async (argv: Argv, cfg: QuartzConfig) => {
//  const noteAssets = await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns])
//  const userAssets = await glob("**", "src/site/img/user/첨부파일", []) // 여기 경로 하드코딩됨
//  return [...noteAssets, ...userAssets]
//}
/*
const copyFile = async (argv: Argv, fp: FilePath) => {
  
  const src = joinSegments(argv.directory, fp) as FilePath

  const name = slugifyFilePath(fp)
  const dest = joinSegments(argv.output, name) as FilePath

  // ensure dir exists
  const dir = path.dirname(dest) as FilePath
  await fs.promises.mkdir(dir, { recursive: true })

  await fs.promises.copyFile(src, dest)
  return dest
}
*/
type AssetToCopy = { path: FilePath, baseDir: string }

const filesToCopy = async (argv: Argv, cfg: QuartzConfig): Promise<AssetToCopy[]> => {
  const noteAssets = await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns])
  const userAssets = await glob("**", "src/site/img/user/첨부파일", [])

  return [
    ...noteAssets.map(path => ({ path, baseDir: argv.directory })),
    ...userAssets.map(path => ({ path, baseDir: "src/site/img/user/첨부파일" })),
  ]
}



const copyFile = async (argv: Argv, asset: AssetToCopy) => {
  const { path: fp, baseDir } = asset

  const src = joinSegments(baseDir, fp) as FilePath
  const absoluteSrc = path.resolve(baseDir, fp)
  const relativePath = path.relative(path.resolve("src/site"), absoluteSrc)

  const dest = joinSegments(argv.output, relativePath) as FilePath
  const dir = path.dirname(dest) as FilePath

  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.copyFile(src, dest)

  return dest
}


export const Assets: QuartzEmitterPlugin = () => {
  return {
    name: "Assets",
    async *emit({ argv, cfg }) {
      const fps = await filesToCopy(argv, cfg)
      for (const asset of fps) {
        yield copyFile(argv, asset)
      }
      /*
      for (const fp of fps) {
        yield copyFile(argv, fp)
      }
        */
    },
    async *partialEmit(ctx, _content, _resources, changeEvents) {
      for (const changeEvent of changeEvents) {
        const ext = path.extname(changeEvent.path)
        if (ext === ".md") continue

        if (changeEvent.type === "add" || changeEvent.type === "change") {
          yield copyFile(ctx.argv, changeEvent.path)
        } else if (changeEvent.type === "delete") {
          const name = slugifyFilePath(changeEvent.path)
          const dest = joinSegments(ctx.argv.output, name) as FilePath
          await fs.promises.unlink(dest)
        }
      }
    },
  }
}
