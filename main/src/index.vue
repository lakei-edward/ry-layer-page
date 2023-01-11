<template>
  <div>
    <el-form-item label="状态" prop="status">
      <el-select
        v-model="queryParams.status"
        placeholder="菜单状态"
        clearable
        size="small"
      >
        <el-option
          v-for="dict in dict.type.sys_normal_disable"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
export default {
  dicts: ["sys_normal_disable"],
  data() {
    return {};
  },
};
</script>