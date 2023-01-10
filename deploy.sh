# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'update 优化文档'

# 上传至服务器
scp -r * root@43.142.176.173:/usr/local/nginx/html/ry-layer-page/