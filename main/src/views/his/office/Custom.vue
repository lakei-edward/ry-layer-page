<template>
  <span>
    <el-form-item
      label="科室类别:"
      :rules="[{ required: true, message: '请输入科室类别', trigger: 'blur' }]"
    >
      <el-select
        v-if="!readonly"
        v-model="params['deptCode']"
        placeholder="请选择"
        @change="handleChange"
      >
        <el-option
          v-for="item in officeClass"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div v-else style="width: 217px">{{ params["deptCode"] }}</div>
    </el-form-item>
    <el-form-item
      label="科室名称:"
      :rules="[{ required: true, message: '请输入科室名称', trigger: 'blur' }]"
    >
      <el-select
        v-if="!readonly"
        v-model="params['deptName']"
        placeholder="请选择"
      >
        <el-option
          v-for="item in officeName"
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
  props: {
    params: {
      type: Object,
      requird: true,
      default: () => {}
    },
    readonly: Boolean
  },
  data() {
    return {
      officeClass: [
        {
          value: "0",
          label: "急诊"
        },
        {
          value: "1",
          label: "门诊"
        }
      ],
      officeName: [],
      office: [
        {
          pid: "0",
          value: "0",
          label: "急诊科"
        },
        {
          pid: "1",
          value: "1",
          label: "内科"
        },
        {
          pid: "1",
          value: "2",
          label: "外科"
        },
        {
          pid: "1",
          value: "3",
          label: "眼科"
        },
        {
          pid: "1",
          value: "4",
          label: "麻醉科"
        }
      ]
    };
  },
  methods: {
    handleChange(val) {
      this.officeName = this.office.filter(v => v.pid === val);
    }
  }
};
</script>
