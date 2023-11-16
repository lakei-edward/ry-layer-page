<template>
  <div id="FormUpdate">
    <el-upload
      ref="upload"
      :drag="drag"
      :multiple="handleMultiple"
      :action="upload.action"
      :before-upload="beforeFileUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-remove="handleRemoveFile"
      :disabled="disabled"
      :limit="limit"
      :file-list="form[fileListLabel]"
      :headers="upload.headers"
      :list-type="listType"
      :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    >
      <template v-if="!drag">
        <el-button
          :type="type"
          :circle="circle"
          :round="round"
          :plain="plain"
          :icon="icon"
          :size="size"
          :disabled="disabled"
        >
          <template v-if="buttonLabel === 'string' && buttonLabel.length === 0"></template>
          <template v-else>
            {{ buttonLabel }}
          </template>
        </el-button>
        <div slot="tip" class="el-upload__tip">
          <span
            v-html="
              upload.textLabel ||
              '请上传 大小不超过 10MB 格式为 doc/docx/xls/xlsx/txt/pdf/jpg/png 的文件'
            "
          ></span>
        </div>
      </template>
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <div>将文件拖到此处，或<em>点击上传</em></div>
          <div class="textLabel">
            <span
              v-html="
                upload.textLabel ||
                '请上传 大小不超过 10MB 格式为 doc/docx/xls/xlsx/txt/pdf/jpg/png 的文件'
              "
            ></span>
          </div>
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'FormUpdate',
  data() {
    return {
      fileIdList: []
    }
  },
  props: {
    form: {
      type: Object
    },
    model: {
      type: String
    },
    upload: {
      type: Object,
      required: true,
      default: () => {}
    },
    fileListLabel: {
      type: String,
      default: 'fileList'
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'small'
    },
    buttonLabel: {
      type: String,
      default: '点击上传'
    },
    storage: {
      type: String,
      default: 'multiple'
    },
    formWidth: {
      type: Number
    },
    listType: {
      type: String,
      default: 'text'
    },
    width: Number,
    limit: Number,
    disabled: Boolean,
    circle: Boolean,
    round: Boolean,
    plain: Boolean,
    icon: String,
    multiple: Boolean,
    drag: Boolean
  },
  computed: {
    /** 处理上传方式 */
    handleMultiple() {
      // 存储文件方式，如果存储方式为单文件，则不允许多选文件上传，否则允许多选或单选上传
      return this.isSingle ? false : this.multiple
    },
    /** 是单存储 */
    isSingle() {
      return this.storage === 'single'
    }
  },
  watch: {
    form(v) {
      if (v[this.fileListLabel]) {
        v[this.fileListLabel].forEach(item => {
          this.fileIdList.push(item.fileId)
        })
        this.form[this.model] = this.fileIdList.join(',')
      }
    }
  },
  beforeDestroy() {
    this.fileIdList = []
  },
  methods: {
    // 导入文件之前
    beforeFileUpload(file) {
      // 默认设置
      const reg = this.upload.reg //
      const _size = this.upload.size || 10
      if (reg && !reg.test(file.name)) {
        // 校验不通过
        this.$alert('暂不支持该格式！', '提示', {
          type: 'warning'
        })
        return false
      } else if (file.size / 1024 / 1024 > _size) {
        this.$message.error(this.upload.sizeLabel || `上传文件大小不能超过10MB`)
        return false
      } else {
        return true
      }
    },

    // 上传成功
    uploadSuccess(file) {
      if (file.code === 200) {
        if (this.isSingle) {
          this.form[this.model] = file.data.fileId
        } else {
          this.fileIdList.push(file.data.fileId)
          this.form[this.model] = this.fileIdList.join(',')
        }
      } else {
        this.$message.error('上传失败')
      }
    },

    // 上传失败
    uploadError() {
      this.$message.error('上传失败')
    },

    //  移除文件
    handleRemoveFile(file) {
      if (file) {
        if (this.isSingle) {
          this.form[this.model] = ''
        } else {
          const id = file.response ? file.response.data.fileId[0] : file.fileId
          this.fileIdList.splice(this.fileIdList.indexOf(id), 1)
          this.form[this.model] = this.fileIdList.join(',')
        }
      }
    }
  }
}
</script>
<style scoped>
.textLabel {
  opacity: 0.7;
  font-size: 13px;
}
</style>
