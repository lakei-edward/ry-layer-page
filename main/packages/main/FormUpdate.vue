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
      :disabled="disabled"
      :limit="limit"
      :headers="upload.headers"
      :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    >
      <el-button
        :type="type"
        :circle="circle"
        :round="round"
        :plain="plain"
        :icon="icon"
        :disabled="disabled"
      >
        <template v-if="_isCircle"></template>
        <template v-else>
          {{ upload.buttonLabel || "点击上传" }}
        </template>
      </el-button>
      <div slot="tip" class="el-upload__tip">
        {{ upload.textLabel || "只能上传jpg/png文件,且不超过10MB" }}
      </div>
    </el-upload>
  </div>
</template>
<script>
import regExp from "../plugin/regExp";
export default {
  name: "FormUpdate",
  data() {
    return {};
  },
  computed: {
    // 判断为真
    _isCircle() {
      return function () {
        return (
          typeof this.upload.buttonLabel === "string" &&
          this.upload.buttonLabel.length === 0
        );
      };
    },
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
    size: {
      type: String,
      default: "small",
    },
    type: {
      type: String,
      default: "primary",
    },
    width: Number,
    limit: Number,
    disabled: Boolean,
    circle: Boolean,
    round: Boolean,
    plain: Boolean,
    icon: String,
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
      this.fileIdList.push(file.data.fileId);
      this.form[this.model] = this.fileIdList.join(",");
    },

    // 上传失败
    uploadError() {
      this.$message.error("上传失败");
    },

    //  新增-移除文件
    handleRemoveFile(file) {
      if (file) {
        const id = file.response.data.fileId;
        this.fileIdList.splice(this.fileIdList.indexOf(id), 1);
        this.form[this.model] = this.fileIdList.join(",");
      }
    },

    // todo 地址有问题 附件下载
    downTemplate(item) {
      this.download("/minio/download/" + item.fileId, {}, item.name);
    },
  },
};
</script>
