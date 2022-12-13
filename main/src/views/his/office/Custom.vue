<template>
  <span>
    <el-form-item label="科室编码:">
      <el-select
        v-if="!readonly"
        v-model="params['deptCode']"
        placeholder="请选择"
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
      <div v-else style="width: 217px">{{ params["deptCode"] }}</div>
    </el-form-item>
  </span>
</template>
<script>
export default {
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
    params: {
      type: Object,
      default: () => {},
      requird: true,
    },
    readonly: Boolean,
  },
  methods: {
    handleChange() {
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
