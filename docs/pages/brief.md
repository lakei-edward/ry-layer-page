# 安装

#### 📦 下载

```sh
$ npm install ry-layer-page -S
# 或者
$ pnpm install ry-layer-page -S
```

#### 🔨 使用

在`main.js`中写入以下内容

参数`http`为若依框架中调取请求方法

```js
import request from "@/utils/request";
import ryLayerPage  from 'ry-layer-page';
import "ry-layer-page/lib/ry-layer-page.css";
Vue.use(ryLayerPage, {
  http: request,
});
```

#### 🎨 选用dict字典

在`main.js`中写入以下内容

如果当前项目中没有配置`$options.dicts`方式引入字典，可进行选配安装`dict`，参数`dict`为若依框架中调取字典的接口

```js
import { getDicts } from "@/api/system/dict/data";
import request from "@/utils/request";
import ryLayerPage from "ry-layer-page";

Vue.use(ryLayerPage, {
  http: request,
  dict: getDicts,
});
```

dict使用示例

```js
export default {
  dicts: ["sys_normal_disable", "sys_show_hide"],
  data() {
    return {}
  }
}
```