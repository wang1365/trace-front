<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="报告日期">
        <el-date-picker v-model="form.reportDate" type="date" placeholder="选择日期"/>
      </el-form-item>

      <el-form-item>
        <el-upload
          ref="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="true"
          :limit="1"
          :data="form"
          name="file"
          multiple="false"
          class="upload-demo"
          action="/qualityReport/add">
          <el-button slot="trigger" size="small" icon="el-icon-plus" type="primary">选择报告</el-button>
          <div slot="trigger" class="el-upload__tip">只能上传jpg/png文件，且不超过20mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="onSubmit">上传报告</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ReportForm',
  data() {
    return {
      form: {
        createTime: null,
        reportDate: '2018-08-03'
        // file: null
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.upload.submit();
    },
    getFile(event) {
      this.form.file = event.target.files[0]
    }
  }
}
</script>

<style scoped>

</style>
