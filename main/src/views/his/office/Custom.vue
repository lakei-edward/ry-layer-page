<template>
  <span>
    <el-form-item
      label="科室类别:"
      prop="deptCode"
      :rules="
        setRules([
          { required: true, message: '请输入科室类别', trigger: 'blur' }
        ])
      "
    >
      <el-select
        v-if="!readonly"
        v-model="params['deptCode']"
        placeholder="请选择"
        style="width: 217px"
        @change="handleChange"
      >
        <el-option
          v-for="item in dict.type.his_office_class"
          :key="item.dictValue"
          :label="item.dictLabel"
          :value="item.dictValue"
        >
        </el-option>
      </el-select>
      <div v-else style="width: 217px">
        {{ params["deptCodeMc"] }}
      </div>
    </el-form-item>
    <el-form-item
      label="科室名称:"
      prop="deptName"
      :rules="
        setRules([
          { required: true, message: '请输入科室名称', trigger: 'blur' }
        ])
      "
    >
      <el-select
        v-if="!readonly"
        v-model="params['deptName']"
        style="width: 217px"
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
      <div v-else style="width: 217px">
        {{ params["deptNameMc"] }}
      </div>
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
    readonly: Boolean,
    noRule: Boolean
  },
  dicts: ["his_office_class"],
  data() {
    return {
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
  computed: {
    /** 根据情况设置校验 */
    setRules() {
      return function(val) {
        // 因为这一个地方在三处使用，所以判断的复杂点；搜索层、新增和查看中用的是一个组件
        return this.readonly || this.noRule ? [] : val;
      };
    }
  },
  watch: {
    "params.deptCode": {
      handler(val) {
        this.officeName = this.office.filter(v => v.pid === val);
      },
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.officeName = this.office.filter(v => v.pid === val);
    }
  }
};
</script>
