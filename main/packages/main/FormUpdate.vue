<template>
  <div id="FormUpdate">
    <el-upload
      ref="Upload"
      :multiple="multiple"
      :action="upload.action"
      :before-upload="beforeFileUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-remove="handleRemoveFile"
      :disabled="disabled"
      :limit="limit"
      :file-list="form[fileListLabel]"
      :headers="upload.headers"
      :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    >
      <el-button
        :type="type"
        :circle="circle"
        :round="round"
        :plain="plain"
        :icon="icon"
        :size="size"
        :disabled="disabled"
      >
        <template
          v-if="buttonLabel === 'string' && buttonLabel.length === 0"
        ></template>
        <template v-else> {{ buttonLabel }} </template>
      </el-button>
      <div slot="tip" class="el-upload__tip">
        <span
          v-html="
            upload.textLabel ||
            '请上传 大小不超过 10MB 格式为 doc/docx/xls/xlsx/txt/pdf/jpg/png 的文件'
          "
        ></span>
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
    fileListLabel: {
      type: String,
      default: "fileList",
    },
    type: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "small",
    },
    buttonLabel: {
      type: String,
      default: "点击上传",
    },
    width: Number,
    limit: Number,
    disabled: Boolean,
    circle: Boolean,
    round: Boolean,
    plain: Boolean,
    icon: String,
    multiple: Boolean,
  },
  watch: {
    form(v) {
      if (v[this.fileListLabel]) {
        v[this.fileListLabel].forEach((item) => {
          this.fileIdList.push(item.fileId);
        });
        this.form[this.model] = this.fileIdList.join(",");
      }
    },
  },
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

    //  移除文件
    handleRemoveFile(file) {
      if (file) {
        const id = file.response ? file.response.data.fileId : file.fileId;
        this.fileIdList.splice(this.fileIdList.indexOf(id), 1);
        this.form[this.model] = this.fileIdList.join(",");
      }
    },
  },
};
</script>
