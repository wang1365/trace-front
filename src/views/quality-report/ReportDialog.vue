<template>
  <el-dialog :visible.sync="visible" title="添加质量检测报告" center width="40%">
    <el-form ref="form" :model="form" :rules="rules" align="left" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入报告标题" />
      </el-form-item>
      <el-form-item label="报告日期" prop="reportDate">
        <el-date-picker v-model="form.reportDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="检测商品" prop="goodsId">
        <el-select v-model="form.goodsId" placeholder="请选择">
          <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="产地" prop="origin">
        <el-input v-model="form.origin" placeholder="请输入产地" />
      </el-form-item>
      <el-form-item label="报告链接" prop="url">
        <el-input v-model="form.url" placeholder="请先到图片管理菜单上传图片" />
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="form.description" type="textarea" placeholder="请输入说明" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSubmit('form')">保 存</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllGoods } from '@/api/goods'
import * as api from '@/api/qualityReport'

export default {
  name: 'ReportForm',
  props: {
  },
  data() {
    return {
      visible: false,
      token: null,
      form: {
        reportDate: null,
        goodsId: null,
        origin: null,
        title: null,
        description: null,
        url: null
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        reportDate: [{ required: true, message: '请选择检测日期', trigger: 'blur' }],
        goodsId: [{ required: true, message: '请选择商品', trigger: 'blur' }],
        origin: [{ required: true, message: '请输入产地', trigger: 'blur' }],
        url: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
      },
      goodsList: [],
      fileList: []
    }
  },
  created() {
    this.form = {
      createTime: null,
      reportDate: null,
      goodsId: null,
      origin: null,
      title: null,
      description: null
    }
  },
  mounted() {
    this.token = this.$store.getters.token
    getAllGoods()
      .then(response => { this.goodsList = response.data.data })
      .catch(err => console.error(err))
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (!valid) {
          return false
        }
        api.addQualityReport(this.form).then(() => {
          this.$message({ message: `保存成功`, type: 'success' })
          this.hide()
          this.$emit('upload-success')
        }).catch(err => {
          this.$error(`保存失败：${err}`)
        })
      })
    }

  }
}
</script>

<style scoped>

</style>
