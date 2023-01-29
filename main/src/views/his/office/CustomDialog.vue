<template>
  <el-dialog
    title="提示"
    width="30%"
    :visible.sync="dialogVisible"
    @close="() => $emit('update:dialogVisible', false)"
  >
    <div>
      该科室处于<el-tag>{{ params.status ? "接诊中" : "停诊中" }}</el-tag>
      状态~
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="$emit('update:dialogVisible', false)"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    queryList: {
      type: Function
    },
    params: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
