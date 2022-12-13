<template>
  <span>
    <el-form-item label="科室编码:">
      <el-select
        v-model="form['deptCode']"
        placeholder="请选择"
        :disabled="query && query.disabled"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="科室电话:">
      <el-select
        v-model="form['deptPhoner']"
        :disabled="query && query.disabled"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item> -->
  </span>
</template>
<script>
export default {
  name: "FormSelect",
  data() {
    return {
      options: [
        {
          value: "0",
          label: "黄金糕",
        },
        {
          value: "1",
          label: "双皮奶",
        },
        {
          value: "2",
          label: "蚵仔煎",
        },
      ],
      options2: [],
    };
  },
  props: {
    form: {
      type: Object,
      default: () => {},
      requird: true,
    },
    query: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleChange(val) {
      this.options2 = [
        {
          value: "1305755",
          label: "lakei",
        },
        {
          value: "159519",
          label: "edward",
        },
      ];
    },
  },
};
</script>
