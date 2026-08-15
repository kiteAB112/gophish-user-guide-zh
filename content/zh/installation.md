# 安装

## 使用预构建二进制文件安装 GoPhish

GoPhish 为大多数操作系统提供[预构建二进制文件](https://github.com/gophish/gophish/releases)。下载适用于本机操作系统的 ZIP 文件并解压即可。

## 从源代码安装 GoPhish

GoPhish 使用 Go 语言编写，因此从源代码构建很简单。需要安装 Go 语言和 C 编译器（例如 `gcc`）。运行 `go get github.com/gophish/gophish` 将 GoPhish 下载至 `$GOPATH`；随后进入 `$GOPATH/src/github.com/gophish/gophish` 并运行 `go build`，即可在当前目录生成二进制文件。

## 了解 `config.json`

GoPhish 根目录中的 `config.json` 用于配置服务。常见选项如下：

| 键 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `admin_server.listen_url` | `127.0.0.1:3333` | 管理服务器的 IP/端口 |
| `admin_server.use_tls` | `false` | 是否为管理服务器启用 TLS |
| `admin_server.cert_path` | `example.crt` | SSL 证书路径 |
| `admin_server.key_path` | `example.key` | SSL 私钥路径 |
| `admin_server.trusted_origins` | `[]` | 以逗号分隔的受信任来源列表 |
| `phish_server.listen_url` | `0.0.0.0:80` | 钓鱼服务器的 IP/端口，落地页在此托管 |

::: warning

`config.json` 可能包含数据库凭据，应确保只有正确的用户可读取。在 Linux 中可使用 `chmod 640 config.json` 限制权限。

:::

### 将 GoPhish 暴露到互联网

默认情况下，`phish_server.listen_url` 会监听所有网络接口。因此，若运行 GoPhish 的主机暴露在互联网（例如 VPS），钓鱼服务器也会暴露在互联网。

如需从互联网访问管理服务器，需要把 `admin_server.listen_url` 改为 `0.0.0.0:3333`。`phish_server.trusted_origins` 可列出预期的入站连接来源；当上游负载均衡器而非应用本身负责 TLS 终止时，这一设置尤其有用。

::: warning

仅在确有必要时才应将管理服务器暴露到互联网。这样做前，强烈建议修改默认密码。

:::

## 创建 SSL 证书与私钥

> 注：从 0.3 版起，GoPhish 会默认创建管理面板使用的自签名证书，因此此步骤可选。

建议通过 HTTPS 访问管理服务器。安装 OpenSSL 后，可用以下命令生成证书和私钥：

```text
openssl req -newkey rsa:2048 -nodes -keyout gophish.key -x509 -days 365 -out gophish.crt
```

按 CSR 提示填写国家、地区等信息即可；本地自签名证书不依赖这些字段。生成后，将 `gophish.key` 和 `gophish.crt` 放到 GoPhish 根目录（与 `config.json` 同级），并在配置中指定：

```text
"admin_server" : {
    "listen_url" : "127.0.0.1:3333",
    "use_tls" : true,
    "cert_path" : "gophish.crt",
    "key_path" : "gophish.key"
}
```

随后启动 GoPhish 时，通过 HTTPS 连接管理服务器并接受自签名证书提示。

## 使用 MySQL

GoPhish 默认使用 SQLite；它可正常工作，但部分环境可能更适合 MySQL 等数据库。从 0.3-dev 起可使用 MySQL。先按实际部署修改 `config.json`：

```text
"db_name" : "mysql",
"db_path" : "root:@(:3306)/gophish?charset=utf8&parseTime=True&loc=UTC",
```

`db_path` 的格式为 `username:password@(host:port)/database?charset=utf8&parseTime=True&loc=UTC`。

GoPhish 使用的日期时间格式与 MySQL 5.7 及以上版本不兼容。将以下内容追加到 `/etc/mysql/mysql.cnf`：

```text
[mysqld]
sql_mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

上述为 MySQL 默认模式，但去除了 `NO_ZERO_IN_DATE` 和 `NO_ZERO_DATE`。最后登录 MySQL 并创建数据库：`CREATE DATABASE gophish CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`。

## 运行 GoPhish

进入 GoPhish 二进制文件所在目录并执行它。启动日志会显示管理服务器、钓鱼服务器与数据库初始化，并给出访问 Web 界面所需端口。

## 以服务方式运行 GoPhish

### Linux 发行版

在 Linux 中以服务方式运行 GoPhish，需要设置服务脚本。可参考[此 GitHub issue](https://github.com/gophish/gophish/issues/586)中的示例实现。

### Windows

在 Windows 中可以使用 [nssm](http://nssm.cc/)。
