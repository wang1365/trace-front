<template>
  <el-dialog :visible.sync="flag" title="添加质量检测报告" center>
    <el-form ref="form" :model="form">
      <el-form-item label="报告日期">
        <el-date-picker v-model="form.reportDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="检测商品">
        <el-select v-model="form.goodsId" placeholder="请选择">
          <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :on-success="onSuccess"
          :on-error="onError"
          :on-preview="onPreview"
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
      <el-button @click="flag = false">取 消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSubmit(fileList)">上传报告</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllGoods } from '@/api/goods'
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
        reportDate: null,
        goodsId: null
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
      reportDate: '2018-08-03'
      // file: null
    }
  },
  mounted() {
    getAllGoods()
      .then(response => { this.goodsList = response.data })
      .catch(err => console.error(err))
  },
  methods: {
    show() {
      this.flag = true
    },
    hide() {
      this.flag = false
      this.$refs['upload'].clearFiles()
    },
    onPreview(file) {
      console.log(file)
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
