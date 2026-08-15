# 常见问题

## 无法访问管理后台

假设刚启动 GoPhish、尝试访问管理后台，并在日志中看到如下错误：

```text
2018/11/15 21:42:22 http: TLS handshake error from 127.0.0.1:51419: tls: first record does not look like a TLS handshake
```

这表示访问了 `http://admin_server`，而不是 `https://admin_server`；请注意必须使用 HTTPS。

## 如何绕过垃圾邮件过滤器

没有万无一失的方式可以绕过垃圾邮件过滤器——**这是一件好事。**

正确配置邮件基础设施以支持 SPF、DKIM 和 DMARC 等现代邮件认证协议，可能有助于提高投递率。可参阅[此文](https://www.trustedsec.com/blog/take-employees-phishing/)。

不过，若测试的目标是衡量用户对钓鱼模拟的反应，建议在批准的测试时间窗内临时将运行 GoPhish 的服务器 IP 加入允许名单。

## 后台没有显示事件

若邮件已成功发送但后台没有出现事件，通常表示某处存在配置错误。可依次检查以下内容。

### 检查邮件模板

创建邮件链接时，应使用 `{{.URL}}` 模板标签。启动演练活动后，GoPhish 会用创建活动时填写的 “URL” 字段值替换它。

创建演练活动时，可向自己发送测试邮件并查看其中链接，以确认是否正常工作。链接应使用创建活动时提供的 URL，并带有唯一的 `rid` 参数，例如：`http://your_url/?rid=XXXXX`。

::: info

**提示：** 不要把 GoPhish URL 直接写入模板。`{{.URL}}` 标签非常重要；GoPhish 依靠它为每个收件人生成唯一 URL。

:::

### 检查演练活动 URL

若邮件中的链接正确、但仍未显示事件，下一步是确认创建演练活动时使用的 URL 正确。

创建活动时，URL 字段**必须指向运行 GoPhish 的服务器，且打开邮件的人必须能够访问它。** 该地址可以是服务器的公网 IP，也可以是 DNS A 记录指向该服务器 IP 的域名。

::: info

**提示：** 点击链接的收件人必须能够访问演练活动 URL。若无法访问 GoPhish 服务器，GoPhish 就不能记录事件。

:::

可先在浏览器中手动访问计划用于演练活动的 URL。不带任何 `rid` 参数时，应看到基本的 `404 page not found` 错误，并在 GoPhish 终端看到一条日志。

::: info

**提示：** 如果 `phish_server` 配置为使用 HTTPS，创建演练活动时应填写 `https://your_url`。

:::

手动访问 URL 正常后，可在创建演练活动时向自己发送测试邮件。若测试成功，应返回落地页；这通常意味着该 URL 可用于活动，前提是所有收件人都能访问它。

## 未捕获提交的表单数据

要捕获通过落地页提交的数据，落地页需要具有特定属性的 HTML `<form>` 元素。以下是能捕获数据的最小示例：

```markup
<form action="" method="POST">
    <input name="username" type="text" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <input type="submit" value="Submit" />
</form>
```

注意以下几点：

- `action` 为 `""`，因此表单提交会被定向到钓鱼页面，继而到达 GoPhish 服务器。
- 表单提交方法为 `POST`。
- 希望在 GoPhish 中看到的每个输入项都应有 `name` 属性。

排查未正确发送数据的 HTML 表单时，应逐项检查这些条件。若仍未正确提交，请检查并移除可能干扰表单提交的 JavaScript。

最后，保存落地页时应确认已选中 “Capture Submitted Data”；否则 GoPhish 会移除输入项的 `name` 属性，数据不会随表单提交。

::: warning

官方文档另有密码采集选项；本项目的内部演练不启用真实密码采集，落地页仅记录经过批准的最小化提交事件。

:::
