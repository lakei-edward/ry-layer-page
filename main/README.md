## 📦 Install

```bash
$ npm install ry-minify-page -S

# 或者

$ pnpm install ry-minify-page -S
```

## 🔨 Usage

在 main.js 中写入以下内容：

```bash
import request from "@/utils/request";
import ryMinifyPage  from 'ry-minify-page';

Vue.use(ryMinifyPage, {
  http: request,
});
```

## 🎨 选用dict字典

在 main.js 中写入以下内容
如果当前项目中没有配置$options.dicts方式引入字典，可进行选配安装dict，参数dict为若依框架中调取字典的接口；

```bash
import { getDicts } from "@/api/system/dict/data";
import request from "@/utils/request";
import ryMinifyPage from "./index";

Vue.use(ryMinifyPage, {
  http: request,
  dict: getDicts,
});
```

选用快捷字典，直接在vue对象中使用
```vue
export default {
  dicts: ["sys_normal_disable", "sys_show_hide"],
  data() {
    return {}
  }
}
```