import { defineConfig } from 'vitepress'

const goTemplateVariable = /\{\{\s*\.[^}]+\}\}/g

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

function preserveGoTemplateVariables(value: string) {
  return escapeHtml(value).replace(goTemplateVariable, (variable) =>
    `<span v-pre>${variable}</span>`)
}

const englishSidebar = [
  {
    text: 'User Guide',
    items: [
      { text: 'Introduction', link: '/en/' },
      { text: 'License', link: '/en/license' },
      { text: 'What is Gophish?', link: '/en/what-is-gophish' },
      { text: 'Installation', link: '/en/installation' },
      { text: 'Getting Started', link: '/en/getting-started' }
    ]
  },
  {
    text: 'Documentation',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/en/documentation/' },
      { text: 'Changing Account Settings', link: '/en/documentation/changing-user-settings' },
      { text: 'Groups', link: '/en/documentation/groups' },
      { text: 'Templates', link: '/en/documentation/templates' },
      { text: 'Attachment Tracking', link: '/en/documentation/attachments' },
      { text: 'Landing Pages', link: '/en/documentation/landing-pages' },
      { text: 'Sending Profiles', link: '/en/documentation/sending-profiles' },
      { text: 'Campaigns', link: '/en/documentation/campaigns' },
      { text: 'Using the API', link: '/en/documentation/using-the-api' },
      { text: 'Generating Reports', link: '/en/documentation/generating-reports' },
      { text: 'Email Reporting', link: '/en/documentation/email-reporting' },
      { text: 'Webhooks', link: '/en/documentation/webhooks' },
      { text: 'User Management', link: '/en/documentation/user-management' },
      { text: 'Logging', link: '/en/documentation/logging' }
    ]
  },
  {
    text: 'Building Your First Campaign',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/en/building-your-first-campaign/' },
      { text: 'Introducing Morning Catch', link: '/en/building-your-first-campaign/introducing-the-morning-catch-corporation' },
      { text: 'Creating the Sending Profile', link: '/en/building-your-first-campaign/creating-the-sending-profile' },
      { text: 'Importing Groups', link: '/en/building-your-first-campaign/importing-groups' },
      { text: 'Creating the Template', link: '/en/building-your-first-campaign/creating-the-template' },
      { text: 'Creating the Landing Page', link: '/en/building-your-first-campaign/creating-the-landing-page' },
      { text: 'Launching the Campaign', link: '/en/building-your-first-campaign/launching-the-campaign' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Template Reference', link: '/en/template-reference' },
      { text: 'Additional References', link: '/en/additional-references' },
      { text: 'FAQ', link: '/en/faq' }
    ]
  }
]

export default defineConfig({
  srcDir: 'content',
  title: 'GoPhish 本地文档',
  description: 'GoPhish 官方 User Guide 与内部实操笔记',
  cleanUrls: true,
  ignoreDeadLinks: true,
  markdown: {
    config(markdown) {
      markdown.core.ruler.after('inline', 'preserve-gophish-template-variables', (state) => {
        for (const token of state.tokens) {
          if (token.type !== 'inline' || !token.children) continue

          for (const child of token.children) {
            if (!goTemplateVariable.test(child.content)) continue
            goTemplateVariable.lastIndex = 0

            const originalType = child.type
            child.type = 'html_inline'
            child.content = originalType === 'code_inline'
              ? `<code v-pre>${escapeHtml(child.content)}</code>`
              : preserveGoTemplateVariables(child.content)
          }
        }
      })
    }
  },
  themeConfig: {
    nav: [
      { text: '英文原文', link: '/en/' },
      { text: '中文导览', link: '/zh/' },
      { text: '实操记录', link: '/practical/' }
    ],
    sidebar: {
      '/en/': englishSidebar,
      '/zh/': [
        {
          text: '用户指南',
          items: [
            { text: '简介', link: '/zh/' },
            { text: '许可证', link: '/zh/license' },
            { text: '什么是 GoPhish？', link: '/zh/what-is-gophish' },
            { text: '安装', link: '/zh/installation' },
            { text: '入门', link: '/zh/getting-started' }
          ]
        },
        {
          text: '文档',
          collapsed: false,
          items: [
            { text: '概览', link: '/zh/documentation/' },
            { text: '更改账户设置', link: '/zh/documentation/changing-user-settings' },
            { text: '组', link: '/zh/documentation/groups' },
            { text: '模板', link: '/zh/documentation/templates' },
            { text: '附件追踪', link: '/zh/documentation/attachments' },
            { text: '落地页', link: '/zh/documentation/landing-pages' },
            { text: '发送配置', link: '/zh/documentation/sending-profiles' },
            { text: '演练活动', link: '/zh/documentation/campaigns' },
            { text: '使用 API', link: '/zh/documentation/using-the-api' },
            { text: '生成报告', link: '/zh/documentation/generating-reports' },
            { text: '邮件报告', link: '/zh/documentation/email-reporting' },
            { text: 'Webhooks', link: '/zh/documentation/webhooks' },
            { text: '用户管理', link: '/zh/documentation/user-management' },
            { text: '日志记录', link: '/zh/documentation/logging' }
          ]
        },
        {
          text: '创建第一个演练活动',
          collapsed: true,
          items: [
            { text: '概览', link: '/zh/building-your-first-campaign/' },
            { text: '介绍 Morning Catch', link: '/zh/building-your-first-campaign/introducing-the-morning-catch-corporation' },
            { text: '创建发送配置', link: '/zh/building-your-first-campaign/creating-the-sending-profile' },
            { text: '导入组', link: '/zh/building-your-first-campaign/importing-groups' },
            { text: '创建模板', link: '/zh/building-your-first-campaign/creating-the-template' },
            { text: '创建落地页', link: '/zh/building-your-first-campaign/creating-the-landing-page' },
            { text: '启动演练活动', link: '/zh/building-your-first-campaign/launching-the-campaign' }
          ]
        },
        {
          text: '参考资料',
          items: [
            { text: '模板参考', link: '/zh/template-reference' },
            { text: '附加参考资料', link: '/zh/additional-references' },
            { text: '常见问题', link: '/zh/faq' }
          ]
        }
      ],
      '/practical/': [
        { text: '实操记录', items: [{ text: '使用规范', link: '/practical/' }] }
      ]
    },
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本页内容' },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新于' }
  }
})
