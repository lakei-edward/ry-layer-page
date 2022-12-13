### 前言
多功能SQL生成器遵循 **“轻页面、重逻辑”** 的原则，由极简页面来处理复杂任务，且它不仅仅是一个项目，而是以“降低时间成本、提高效率”为目标的执行工具。
### 整体技术选型
项目前端是采用的Vue框架，后端使用的是SpringBoot实现，由于只是做JSON的转译处理，所以无需使用数据库等其他工具。

### 项目划分
>点击下方标题链接查看详情

1. [多功能SQL生成器主站💡](http://www.json-sql.com) <br>
实现将JSON转译为所需可执行SQL语句、支持多级嵌套、属性替换、内嵌语法，从而让复杂无趣的工作简单化。<br>
技术分析：
   - Vue框架
   - AntDesign UI UI组件库
   - MonacoEditor 编辑器
   - sql-formatter SQL格式化

2. [后端实现🛠](https://github.com/pdxjie/sql-translate/tree/main/sql-translate-main) <br>
主要处理转译JSON的相关逻辑。<br>
技术分析：
   - SpringBoot
   - fastjson

2. [多功能SQL生成器文档📚](https://pdxjie.github.io/translate.github.io/) <br>
多功能SQL生成器项目的使用指南和详细介绍。<br>
技术分析：
   - Vuepress
    
### （前端）快速开始

**请保证Node.js版本 > 10 :warning:**
1. 下载项目到本地
```shell
git clone https://github.com/pdxjie/sql-translate.git
```
2. 进入目录，安装依赖
```shell
cd sql-translate-home
yarn install
```
3. 启动本地项目
```shell
npm run serve
```

### （后端）快速开始
**JDK版本>=8 工具——>IDEA :warning:**
```shell
cd sql-translate-main
```