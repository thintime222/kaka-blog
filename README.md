# kaka-blog（Vite + React18 + TS + Sass + MDX）

内容仍然使用 **MDX** 承载，通过 **约定式内容目录与文件命名**，在运行时用 `import.meta.glob` 扫描生成 **菜单 + 路由**。

## 约定

- **内容目录**：`src/page/md/<parentPath>_<parentTitle>/`
- **文章文件名**：`<date>@<name>.mdx`（例如 `20220507@xxx.mdx`）
- **动态路由**：`src/service/mdx-service.ts` + `src/routes/index.tsx`

## 开发

```bash
npm i
npm run dev
```

## 部署到 Vercel

- **SPA 路由回退**：已提供 `vercel.json`，把任意路径重写到 `index.html`（配合 `BrowserRouter`）
- **Build 命令**：`npm run build`
- **Output 目录**：`dist`

把项目导入 Vercel 后即可自动部署。
