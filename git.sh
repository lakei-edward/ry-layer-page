git add -A

# 获取命令行的第一个参数作为提交信息
git commit -m "$1"

# 上传
git push

echo '上传成功'
