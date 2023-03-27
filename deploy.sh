# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'update 优化文档'

# 上传至服务器
scp -r * root@43.142.176.173:/data/nginx/html/ry-layer-page/