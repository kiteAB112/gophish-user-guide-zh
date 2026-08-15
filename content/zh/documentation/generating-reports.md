# 生成报告

报告是每场 GoPhish 演练活动的重要组成部分。可考虑以下方式生成报告。

## 使用 Web 界面

GoPhish 后台可快速概览某场演练活动的结果：

![](../.gitbook/assets/localhost_3333_campaigns_25-macbook.png)

除在后台查看结果外，还可点击页面顶部的 “Export CSV” 导出 GoPhish 原始日志，并使用 Excel、Google Sheets 等软件解析 CSV 文件。

## 使用 GoReport

GoPhish 社区围绕 API 构建了许多可简化报告工作的工具，[GoReport](https://github.com/chrismaddalena/GoReport) 就是一个例子。

GitHub 用户 [@chrismaddalena](https://github.com/chrismaddalena/) 创建的 GoReport 提供了一种简单、清晰的方式，可为指定 GoPhish 演练活动生成 CSV 或 DOCX 格式报告。

## 使用 API

若需为一个或多个演练活动制作自定义报告，强烈建议使用功能完整的 [GoPhish API](https://docs.getgophish.com/api-documentation/)。

官方提供了 [Python API 客户端](https://github.com/gophish/api-client-python)，可帮助从 API 获取所需数据；其文档见[此处](https://docs.getgophish.com/python-api-client/)。
