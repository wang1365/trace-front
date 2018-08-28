<template>
  <el-dialog :visible.sync="flag" title="添加质量检测报告">
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="报告日期">
        <el-date-picker v-model="form.reportDate" type="date" placeholder="选择日期"/>
      </el-form-item>

      <el-form-item>
        <el-upload
          ref="upload"
          :on-success="onSuccess"
          :on-error="onError"
          :before-upload="beforeUpload"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          :data="form"
          name="file"
          class="upload-demo"
          action="/qualityReport/add">
          <el-button slot="trigger" size="small" icon="el-icon-plus" type="primary">选择报告</el-button>
          <div slot="trigger" class="el-upload__tip">只能上传jpg/png文件，且不超过20mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="onSubmit(fileList)">上传报告</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'ReportForm',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: this.dialogVisible,
      form: {
        createTime: null,
        reportDate: '2018-08-03'
        // file: null
      },
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
      reportDate: '2018-08-03'
      // file: null
    }
    console.log('############ created')
  },
  mounted() {
    console.log('############ mounted')
  },
  methods: {
    show() {
      this.flag = true
    },
    hide() {
      this.flag = false
      this.$refs['upload'].clearFiles()
    },
    onSubmit(fileList) {
      this.$refs.upload.submit()
    },
    onSuccess(response, file, fileList) {
      this.$message({
        message: `文件${file.name}上传成功`,
        type: 'success'
      })
      this.hide()
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
