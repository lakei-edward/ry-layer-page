module.exports = {
  /**
   * 侧边栏主题 深色主题theme-dark，浅色主题theme-light，蓝色主题theme-blue ，亮蓝色主题theme-light-blue
   */
  // sideTheme: "theme-light-blue",
  sideTheme: "theme-dark",

  /**
   * 是否系统布局配置
   */
  showSettings: false,

  /**
   * 是否显示顶部导航
   */
  topNav: false,

  /**
   * 是否显示 tagsView
   */
  tagsView: false,

  /**
   * 是否固定头部
   */
  fixedHeader: false,

  /**
   * 是否显示logo
   */
  sidebarLogo: true,

  /**
   * 是否显示动态标题
   */
  dynamicTitle: false,

  /**
   * 是否开启keep-alive
   */
  isKeepAlive: false,

  /**
   * 是否开启标签页拖拽
   */
  isDraggable: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: "production"
};
