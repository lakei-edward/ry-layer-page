<template>
  <el-date-picker
    v-model="dateTime"
    :size="size"
    :type="type"
    :format="format"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :placeholder="placeholder"
    :value-format="valueFormat"
    :popper-class="popperClass"
    :prefix-icon="prefixIcon"
    :append-to-body="appendToBody"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    @change="changeDate"
  >
  </el-date-picker>
</template>
<script>
export default {
  name: 'FormDateRange',
  data() {
    return {
      dateTime: []
    }
  },
  props: {
    form: {
      type: Object
    },
    model: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    popperClass: {
      type: String
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    prefixIcon: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    startTimeLabel: {
      type: String,
      default: 'startTime'
    },
    endTimeLabel: {
      type: String,
      default: 'endTime'
    },
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '结束时间'
    },
    width: {
      type: Number
    },
    formWidth: {
      type: Number
    },
    disabled: Boolean,
    editable: Boolean,
    clearable: Boolean,
    appendToBody: Boolean
  },
  beforeDestroy() {
    this.dateTime = []
  },
  methods: {
    changeDate(val) {
      if (val && val.length > 0) {
        this.form[this.startTimeLabel] = val[0]
        this.form[this.endTimeLabel] = val[1]
      }
    }
  }
}
</script>
