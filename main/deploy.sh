# 确保脚本抛出遇到的错误
set -e

# 打包
npm run build:prod

# 上传至服务器
scp -r dist/* root@43.142.176.173:/data/nginx/html/ry-test-system/