<template>
  <el-dialog :visible.sync="visible" title="添加公司资质证书" center>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="公司" prop="companyId">
        <el-select v-model="form.companyId" placeholder="请选择">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="资质和荣誉证书">
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
          action="/web/qualification/addQualification">
          <el-button slot="trigger" size="small" icon="el-icon-plus" type="primary">选择图片</el-button>
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
import { getAllCompany } from '@/api/company'
export default {
  name: 'ReportForm',
  props: {
  },
  data() {
    return {
      visible: false,
      token: null,
      form: {
        createTime: null,
        companyId: null
      },
      companyList: [],
      fileList: [],
      rules: {
        companyId: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  },
  created() {
    this.form = {
      createTime: null,
      companyId: null
    }
  },
  mounted() {
    this.token = this.$store.getters.token
    getAllCompany()
      .then(response => { this.companyList = response.data.data })
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
        if (valid) {
          this.$refs.upload.submit()
        }
      })
    },
    onSuccess(response, file, fileList) {
      this.$message({ message: `文件${file.name}上传成功`, type: 'success' })
      this.$refs['form'].resetFields()
      this.$emit('upload-success')
      this.hide()
    },
    onError(err, file, fileList) {
      this.$message({ message: `文件${file.name}上传失败：${err}`, type: 'error' })
    },
    getFile(event) {
      this.form.file = event.target.files[0]
    }
  }
}
</script>

<style scoped>

</style>
