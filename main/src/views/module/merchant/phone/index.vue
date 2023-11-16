<template>
  <div class="phone-sign">
    <OperateForm :operate-layer="operateLayer"> </OperateForm>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    const rules = message => {
      return [
        {
          required: true,
          message,
          trigger: 'change'
        }
      ]
    }
    const form = [
      {
        label: '公司名称',
        model: 'unit',
        component: 'FormInput',
        rules: rules('请输入公司名称'),
        width: '100%'
      },
      {
        label: '手机号',
        model: 'phone',
        component: 'FormInput',
        rules: rules('请输入手机号'),
        width: '100%'
      },
      {
        label: '公司官网',
        model: 'website',
        component: 'FormInput',
        rules: rules('请输入官网'),
        width: '100%'
      },
      {
        label: '省市',
        model: 'areaCity',
        component: 'FormArea',
        options: 'provinceAndCityData',
        width: '100%',
        rules: rules('请输入省市')
      },
      {
        label: '是否参加',
        model: 'isJoin',
        component: 'FormSelect',
        dict: [
          { label: '参加', value: 'Y' },
          { label: '不参加', value: 'N' }
        ],
        width: '100%',
        rules: rules('请选择是否参加本次活动')
      },
      {
        label: '活动建议',
        model: 'adviceInfo',
        component: 'FormTextarea',
        rules: rules('请输入手机号'),
        maxlength: 300,
        showWordLimit: true,
        rows: 5,
        width: '100%'
      },
      {
        label: '企业Logo',
        model: 'logoPath',
        size: 'small',
        component: 'FormUpdate',
        rules: rules('请上传企业Logo'),
        // width: 380,
        drag: true,
        icon: 'el-icon-receiving',
        fileListLabel: 'lsfj',
        multiple: false,
        listType: 'picture',
        image: {
          show: true,
          alt: '图片异常'
          // width: 200
        },
        pathLabel: 'path',
        limit: 1,
        storage: 'single',
        buttonLabel: '上传图片',
        upload: {
          action: `${process.env.VUE_APP_BASE_API}/minio/upload`,
          headers: { Authorization: `Bearer ${getToken()}` },
          reg: /^.*\.(?:jpg|jpeg|png|webp)$/i,
          size: 5,
          textLabel: "请上传大小不超过 <span style='color:#ff0078'>5MB</span> 的图片",
          sizeLabel: '上传图片大小不能超过5MB'
        }
      }
    ]
    return {
      operateLayer: {
        inline: false,
        // labelWidth: '100px',
        params: {},
        mode: {
          form
        }
      }
    }
  },
  props: [],
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.phone-sign {
  padding: 0 15px;
}
</style>
