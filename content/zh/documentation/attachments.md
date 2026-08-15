# 附件追踪

可在特定附件类型的内容中加入 GoPhish [模板变量](https://docs.getgophish.com/user-guide/template-reference)。支持的文件类型如下：

| 类型 | 扩展名 | 示例模板 |
| :--- | :---: | :--- |
| Word 文档 | `.docx` | [gophish_word.docx](example-attachments/gophish_word.docx) |
| 启用宏的 Word 文档 | `.docm` | [gophish_word_macro.docm](example-attachments/gophish_word_macro.docm) |
| PowerPoint 演示文稿 | `.pptx` | [gophish_powerpoint.pptx](example-attachments/gophish_powerpoint.pptx) |
| Excel 文档 | `.xlsx` | [gophish_excel.xlsx](example-attachments/gophish_excel.xlsx) |
| 启用宏的 Excel 文档 | `.xlsm` | [gophish_excel_macro.xlsm](example-attachments/gophish_excel_macro.xlsm) |
| 纯文本文件 | `.txt` | [gophish_text.txt](example-attachments/gophish_text.txt) |
| HTML 文件 | `.html` | [gophish_html.html](example-attachments/gophish_html.html) |
| 日历文件 | `.ics` | [gophish_invite.ics](example-attachments/gophish_invite.ics) |

活动启动时，文档内的模板变量会替换为相应值。在 Office 文档中加入追踪图片，可在文档被打开或宏被启用时获得通知。

若仅需快速开始，可直接使用上述示例模板。以下说明这些示例的创建方式，尤其是设置较复杂的 Office 文档。

## 纯文本示例

以下 `.txt` 文件包含多个变量：

```text
Hello {{.FirstName}},
This is a plain text file that was sent to {{.Email}}. If you could be so kind as to copy and paste this URL into your browser: {{.URL}}
```

该方式并非立即适用于所有场景，但在需要对纯文本附件套用模板时可使用。以下为 `.ics` 日历邀请的一部分：

```text
BEGIN:VCALENDAR
SUMMARY:Gophish Test Calendar
DESCRIPTION:Glenn is inviting you to a Zoom meeting.
 n\nJoin Zoom Meeting\n{{.URL}}
LOCATION:{{.URL}}
END:VCALENDAR
```

## Office 文档示例

此功能更常见的用途是追踪 Microsoft Office 文档是否被打开，以及宏是否被启用。GoPhish 支持多种 Office 格式，处理方式大致相同。

### 追踪 Office 文档被打开

可将 `{{.TrackingURL}}` 作为“链接图片”加入 Office 文档。文档打开时，Word、Excel 或 PowerPoint 会尝试加载图片，进而访问 GoPhish 服务器并将文档标记为已打开。此时追踪 URL 不应出现在邮件中，因为该阶段只有一个“已打开”端点。

操作步骤如下：

1. 新建文档。
2. 在 `Insert` 标签中依次点击 `Quick Parts` 和 `Field`。
3. 选择 `IncludePicture`；在文件名或 URL 输入框中填入 `{{.TrackingURL}}`，并勾选 `Data not stored with document`。也可在 Word 中按 Alt+F9 后粘贴 `INCLUDEPICTURE  "{{.TrackingURL}}" \d`。
4. 若要在 Word 正文中加入 `{{.FirstName}}` 等变量，需要关闭拼写和语法检查，以免 Word 在变量名中插入 `proofErrors`。在 File > Options > Proofing 中取消勾选 `Check spelling as you type` 与 `Mark grammar errors as you type`。

### 追踪 Office 文档宏执行

要判断用户是否启用宏，宏代码需要访问 GoPhish 模板变量（如 `{{.TrackerURL}}`）或 GoPhish 端点（如 `{{.URL}}`）。由于宏代码以二进制格式封装，不能简单地将变量直接插入宏代码。原始指南的做法是在文档中创建含有 `{{.URL}}` 的文本框，并由宏代码读取该文本框。

1. 新建文档。
2. 新建内容为 `{{.URL}}` 的文本框。
3. 将文本框命名为 `urlbox`：Windows 使用 Home > Editing > Select > Selection Pane；macOS 使用 Shape Format > Arrange > Selection Pane。
4. 将相应宏代码加入文档，然后保存并退出。

文档打开时会提示用户启用宏。若用户启用，`{{.URL}}` 会被打开，从而可显示用户已落入钓鱼演练的提示页面。
