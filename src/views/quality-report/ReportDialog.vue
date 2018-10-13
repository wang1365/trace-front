<template>
  <el-dialog :visible.sync="visible" title="添加质量检测报告" center>
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
      <el-form-item label="说明">
        <el-input v-model="form.description" placeholder="请输入说明" />
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :on-success="onSuccess"
          :on-error="onError"
          :on-preview="onPreview"
          :headers="{ 'cookie-bearer': token}"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          :data="form"
          name="file"
          list-type="picture"
          class="upload-demo"
          action="/web/qualityReport/add">
          <el-button slot="trigger" size="small" icon="el-icon-plus" type="primary">选择报告</el-button>
          <div slot="trigger" class="el-upload__tip">只能上传jpg/png文件，且不超过20mb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSubmit('form')">上传报告</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllGoods } from '@/api/goods'
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
        description: null
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        reportDate: [{ required: true, message: '请选择检测日期', trigger: 'blur' }],
        goodsId: [{ required: true, message: '请选择商品', trigger: 'blur' }],
        origin: [{ required: true, message: '请输入产地', trigger: 'blur' }]
      },
      goodsList: [],
      fileList: []
    }
  },
  watch: {
    dialogVisible(newVal) {
      this.flag = this.dialogVisible
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
      this.$refs['upload'].clearFiles()
    },
    onPreview(file) {
      console.log(file)
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (!valid) {
          return false
        }
        this.$refs.upload.submit()
      })
    },
    onSuccess(response, file, fileList) {
      this.$message({ message: `文件${file.name}上传成功`, type: 'success' })
      this.$refs['form'].resetFields()
      this.hide()
      this.$emit('upload-success')
    },
    onError(err, file, fileList) {
      this.$error(`文件${file.name}上传失败：${err}`)
    },
    getFile(event) {
      this.form.file = event.target.files[0]
    }
  }
}
</script>

<style scoped>

</style>
