module.exports = {
  base: '/', //部署之后访问得路径
  head: [
    [
      'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: 'icon', href: 'ry-layer-page.png' }
    ]
  ],
  title: 'ry-layer-page',
  themeConfig: {
    logo: '/ry-layer-page.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '快速入门', link: '/pages/' },
      // { text: "案例系统", link: "http://www.luckyui.cn/ry-test-system/" },
      { text: '个人博客', link: 'https://boke.luckyui.cn/' },
      { text: 'GitHub', link: 'https://github.com/lakei-edward/ry-layer-page' }
      // { text: "在线访问", link: "http://www.json-sql.com" },
    ],
    sidebar: {
      '/pages/': [
        {
          title: '开发指南',
          collapsable: false,
          children: ['', 'brief', 'layer']
        },
        {
          title: '核心功能',
          collapsable: false,
          children: ['searchLayer', 'operateLayer', 'displayLayer', 'modeType', 'othgerUsage']
        },
        {
          title: '单表单组件',
          collapsable: false,
          children: [
            'formScene',
            'formInput',
            'formSelect',
            'formTextarea',
            'formDate',
            'formDateRange',
            'formTreeSelect',
            'formUpdate',
            'formCustom'
          ]
        },
        {
          title: '了解更多',
          collapsable: false,
          children: ['aboutDetail', 'aboutDict', 'log']
        }
      ]
    }
  },
  plugins: [
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        options: {
          bgColor: 'rgba(0,0,0,0.6)'
        }
      }
    ]
  ]
}
