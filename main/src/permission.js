import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { getFirstRouter } from "@/utils/shuke";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/auth-redirect", "/bind", "/register"];

const routersChild = ["/vue2-app", "/vue3-app"];
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   if (getToken()) {
//     to.meta.title && store.dispatch("settings/setTitle", to.meta.title);
//     /* has token*/
//     if (to.path === "/login") {
//       next({ path: "/login" });
//       NProgress.done();
//     } else {
//       // routersChild.includes(from.path)
//       if (store.getters.roles.length === 0) {
//         // 判断当前用户是否已拉取完user_info信息
//         store
//           .dispatch("GetInfo")
//           .then(() => {
//             store.dispatch("GenerateRoutes").then(accessRoutes => {
//               // 根据roles权限生成可访问的路由表
//               router.addRoutes(accessRoutes); // 动态添加可访问路由表
//               // 跳转到返回的第一个路由
//               if (
//                 (accessRoutes.length > 0 && from.path === "/login") ||
//                 to.path === "/"
//               ) {
//                 let firstRouter = getFirstRouter(accessRoutes);
//                 // 有参数JSON的query参数转成对象格式
//                 if (
//                   firstRouter.query &&
//                   typeof firstRouter.query === "string"
//                 ) {
//                   firstRouter.query = JSON.parse(firstRouter.query); //转参数
//                 }
//                 next({ ...firstRouter, replace: true }); // hack方法 确保addRoutes已完成
//               } else {
//                 next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
//               }
//             });
//           })
//           .catch(err => {
//             store.dispatch("LogOut").then(() => {
//               Message.error(err);
//               next({ path: "/" });
//             });
//           });
//       } else {
//         console.log(JSON.parse(JSON.stringify(store.getters.sidebarRouters)));
//         next();
//       }
//     }
//   } else {
//     // 没有token
//     if (whiteList.indexOf(to.path) !== -1) {
//       // 在免登录白名单，直接进入
//       next();
//     } else {
//       next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
//       NProgress.done();
//     }
//   }
// });

router.afterEach(() => {
  NProgress.done();
});
