# 日志记录

## 配置日志

默认情况下，日志会输出到终端的 `stderr` 文件句柄。必要时也可将日志保存到文件中。

### 将日志写入文件

在 GoPhish 0.8.0 之前，可用标准 Shell 重定向将终端日志写入文件：

```text
$ ./gophish > gophish.log 2>&1
```

缺点是日志不再显示在终端中。从 GoPhish 0.8.0 起，可以直接在 GoPhish 内配置额外日志。

在 `config.json` 中修改 `logging` 段，填写希望使用的日志文件名：

```javascript
"logging": {
	"filename": "gophish.log"
}
```

### 将日志发送到外部来源

将日志写入文件后，也可以将其发送到 SIEM 等外部来源。例如，可使用 [Filebeat](https://www.elastic.co/products/beats/filebeat) 监视日志文件，并将日志条目发送至指定的外部系统。
