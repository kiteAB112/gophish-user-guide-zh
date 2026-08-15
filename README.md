# GoPhish User Guide 中文翻译

这是一个基于 VitePress 的 GoPhish User Guide 阅读站点，包含：

- `content/en`：适配 VitePress 的英文原文副本；
- `content/zh`：中文译文；
- 本地化图片资源，便于离线浏览与维护。

## 内容来源与说明

英文原文来自 [gophish/user-guide](https://github.com/gophish/user-guide)，其 README 标注的文档版本为 v0.10.1。GoPhish 当前版本及行为请以[官方发布页](https://github.com/gophish/gophish/releases)和实际部署版本为准。

本仓库是非官方的文档适配与中文翻译项目，不隶属于 GoPhish 项目。原文版权及许可证信息见 [`content/en/license.md`](content/en/license.md)。

## 本地预览

需要 Node.js 20 或更高版本。

```bash
npm install
npm run docs:dev
```

随后打开终端显示的本地地址（默认是 `http://127.0.0.1:5173`）。

## 构建

```bash
npm run docs:build
```

静态站点输出到 `.vitepress/dist`。

## 使用边界

GoPhish 应仅用于已获授权、范围明确的安全意识演练或渗透测试。请遵守适用法律、组织政策和数据最小化原则。
