<template>
  <div>
    <component
      v-bind="$attrs"
      :is="form.component"
      :ref="form.component"
      :form="formParams"
      :type="form.type"
      :startTimeLabel="form.startTimeLabel"
      :endTimeLabel="form.endTimeLabel"
      :editable="form.editable"
      :valueFormat="form.valueFormat"
      :buttonLabel="form.buttonLabel"
      :treeUrl="form.treeUrl"
      :placeholder="form.placeholder"
      :normalizer="form.normalizer"
      :params="form.params"
      :callback="form.callback"
      :maxHeight="form.maxHeight"
      :alwaysOpen="form.alwaysOpen"
      :appendToBody="form.appendToBody"
      :showCount="form.showCount"
      :zIndex="form.zIndex"
      :flat="form.flat"
      :upload="form.upload"
      :file-id-list="form.fileIdList"
      :reg="form.reg"
      :size="form.size"
      :describe="form.describe"
      :row="form.row"
      :limit="form.limit"
      :dict="form.dict"
      :children="form.children"
      :model="form.model"
      :clearable="form.clearable"
      :maxlength="form.maxlength"
      :minlength="form.minlength"
      :width="form.width"
      :show-password="form.showPassword"
      :disabled="form.disabled"
      :format="form.format"
      :readonly="form.readonly"
      :popper-class="form.popperClass"
      :filterable="form.filterable"
      :allow-create="form.allowCreate"
      :multiple="form.multiple"
      :reg-exp="form.regExp"
      :autofocus="form.autofocus"
      :prefix-icon="form.prefixIcon"
      :suffix-icon="form.suffixIcon"
      :icon="form.icon"
      :round="form.round"
      :circle="form.circle"
      :plain="form.plain"
      :drag="form.drag"
      :fileListLabel="form.fileListLabel"
      :show-word-limit="form.showWordLimit"
    />
  </div>
</template>

<script>
/**
 * 可以使用ry-layer-page中单个表单组件，通过该组件来转一下！
 */
import FormSelect from "./FormSelect.vue";
import FormInput from "./FormInput.vue";
import FormDateRange from "./FormDateRange.vue";
import FormTreeSelect from "./FormTreeSelect.vue";
import FormDate from "./FormDate.vue";
import FormTextarea from "./FormTextarea.vue";
import FormUpdate from "./FormUpdate.vue";
export default {
  name: "SingleFormPiece",
  data() {
    return {};
  },
  props: {
    form: {
      type: Object
    },
    formParams: {
      type: Object
    }
  },
  components: {
    FormSelect,
    FormDateRange,
    FormInput,
    FormTreeSelect,
    FormDate,
    FormTextarea,
    FormUpdate
  }
};
</script>
