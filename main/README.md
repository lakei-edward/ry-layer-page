## 📦 Install

```bash
npm install ry-minify-page

or

pnpm install ry-minify-page
```

## 🔨 Usage

在 main.js 中写入以下内容：

```bash
import request from "@/utils/request";
import ryMinifyPage  from 'ry-minify-page';

Vue.use(ryMinifyPage, {
  request,
});
```

## 🎨 选用$options字典

选用快捷字典，直接在vue对象中使用
```vue
export default {
  dicts: ["sys_normal_disable", "sys_show_hide"],
  data() {
    return {}
  }
}
```

在 main.js 中写入以下内容：

```bash
import { getDicts } from "@/api/system/dict/data";
import request from "@/utils/request";
import ryMinifyPage from "./index";

Vue.use(ryMinifyPage, {
  request,
  dict: getDicts,
});

```