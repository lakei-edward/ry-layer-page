import { saveAs } from "file-saver";
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    let part = `${encodeURIComponent(propName)}=`;
    if (value !== null && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== "undefined") {
            let params = `${propName}[${key}]`;
            let subPart = `${encodeURIComponent(params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}

export function download(url, params, filename, service) {
  return service
    .post(url, params, {
      transformRequest: [
        params => {
          return tansParams(params);
        }
      ],
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob"
    })
    .then(async data => {
      const isLogin = await blobValidate(data);
      if (isLogin) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        Message.error("无效的会话，或者会话已过期，请重新登录。");
      }
    })
    .catch(r => {
      Message.error("下载文件出现错误，请联系管理员！");
    });
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

// 通用下载方法
export function exportFiles(url, data, filename, service) {
  return service
    .post(url, data, {
      transformRequest: [
        params => {
          return tansParams(params);
        }
      ],
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob"
    })
    .then(async data => {
      const isLogin = await blobValidate(data);
      if (isLogin) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        Message.error("无效的会话，或者会话已过期，请重新登录。");
      }
    })
    .catch(r => {
      Message.error("下载文件出现错误，请联系管理员！");
    });
}
