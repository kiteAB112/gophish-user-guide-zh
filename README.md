# GoPhish 本地文档站

此目录是独立的 VitePress 站点。`content/en` 是已适配 VitePress 的 GoPhish 英文指南副本，包含本地图片资源，不依赖项目根目录的 `user-guide` GitBook 仓库。

上游仓库仅可作为后续人工比对资料；若要同步更新，请将确认过的变更合并到本目录的英文副本。

## 本地运行

```powershell
& H:\envs\Nodejs-24.16.0\npm.cmd run docs:dev
```

打开 <http://127.0.0.1:5173>。

## 构建静态站点

```powershell
& H:\envs\Nodejs-24.16.0\npm.cmd run docs:build
```

输出目录为 `.vitepress/dist`。部署前需另行确认访问控制与变更范围。
