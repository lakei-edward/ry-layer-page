#### 📃 参考文档
<a href="https://lakei-edward.github.io/luckyui.github.io/">vue-luckyui中文文档地址</a>

#### 📦 Install
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```sh
$ npm install vue-luckyui
```
#### 🔨 Usage
**完整引入**
  
在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import luckyui from 'vue-luckyui';
import "vue-luckyui/lib/index.min.css"
import App from './App.vue';

Vue.use(luckyui)

new Vue({
  el: '#app',
  render: h => h(App)
});
```

#### 📁按需引入

如果你只希望引入部分组件，比如 Button 和 Contextmenu，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import { Button,Contextmenu } from '../lib/vue-luckyui.common';

Vue.component(Button.name, Button)
Vue.component(Contextmenu.name, Contextmenu)

/* 或写为
 * Vue.use(Button)
 * Vue.use(Contextmenu)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```