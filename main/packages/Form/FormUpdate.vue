<template>
  <div id="FormUpdate">
    <el-upload
      ref="Upload"
      :multiple="upload.multiple"
      :action="upload.action"
      :before-upload="beforeFileUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-remove="handleRemoveFile"
      :limit="limit"
      :headers="upload.headers"
      :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    >
      <el-button size="small" type="primary">{{
        upload.buttonLabel || "点击上传"
      }}</el-button>
      <div slot="tip" class="el-upload__tip">
        {{ upload.textLabel || "只能上传jpg/png文件,且不超过10MB" }}
      </div>
    </el-upload>
  </div>
</template>
<script>
import regExp from "./plugin/regExp";
export default {
  name: "FormUpdate",
  data() {
    return {};
  },
  props: {
    form: {
      type: Object,
    },
    model: {
      type: String,
    },
    fileIdList: {
      type: Array,
      default: () => [],
    },
    upload: {
      type: Object,
      required: true,
      default: () => {},
    },
    width: Number,
    limit: Number,
  },
  mounted() {},
  methods: {
    // 导入文件之前
    beforeFileUpload(file) {
      // 默认设置
      const reg = this.upload.reg || regExp.files;
      const _size = this.upload.size || 10;
      if (!reg.test(file.name)) {
        //校验不通过
        this.$alert("暂不支持该格式！", "提示", {
          type: "warning",
        });
        return false;
      } else if (file.size / 1024 / 1024 > _size) {
        this.$message.error(
          this.upload.sizeLabel || `上传文件大小不能超过10MB`
        );
        return false;
      } else {
        return true;
      }
    },

    // 上传成功
    uploadSuccess(file) {
      this.fileIdList.push(file.data.fileId[0]);
      this.form[this.model] = this.fileIdList.join(",");
    },

    // 上传失败
    uploadError() {
      this.$message.error("上传失败");
    },

    //  新增-移除文件
    handleRemoveFile(file, fileList) {
      this.fileIdList = [];
      this.form[this.model] = undefined;
      this.fileIdList = fileList.map((item) => item.fileId);
      this.form[this.model] = this.fileIdList.join(",");
      console.log(this.fileList);
    },

    //附件下载
    downTemplate(item) {
      this.download("/minio/download/" + item.fileId, {}, item.name);
    },
  },
};
</script>
