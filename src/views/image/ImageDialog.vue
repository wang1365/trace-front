<template>
  <el-dialog
    :visible.sync="visible"
    title="添加图片"
    width="40%">
    <el-form
      v-loading.fullscreen="loading"
      ref="ruleForm"
      :rules="formRules"
      label-width="80px"
      element-loading-text="拼命上传中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form-item label="类别" prop="selectedCat">
        <el-select v-model="selectedCat" placeholder="请选择类别">
          <el-option v-for="item in catList" :key="item.id" :label="item.name" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="图片名称" prop="imageName">
        <el-input v-model="imageName" placeholder="填写图片名称"/>
      </el-form-item >
      <el-form-item>
        <el-upload
          ref="upload"
          :auto-upload="false"
          :limit="1"
          :on-success="onSuccess"
          :on-error="onError"
          :file-list="fileList"
          :data="uploadData"
          :headers="{ 'Authorization': 'Bearer ' + token}"
          name="file"
          list-type="picture"
          class="upload-demo"
          action="/web/addImage">
          <el-button slot="trigger" size="small" icon="el-icon-plus" type="primary">选择图片</el-button>
          <div slot="trigger" class="el-upload__tip">只能上传jpg/png文件，且不超过20mb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">添加</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getImageCategoryList } from '@/api/image'

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
      visible: false,
      loading: false,
      useOriginName: true,
      catList: [],
      token: null,
      fileList: [],
      selectedCat: null,
      imageName: null,
      formRules: {
        imageName: [
          { required: true, message: '请输入图片名称', trigger: 'blur' }
        ],
        selectedCat: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    uploadData() {
      return {
        name: this.imageName,
        catId: this.selectedCat ? this.selectedCat.id : -1
      }
    }
  },
  watch: {
    selectedCat() {
      this.imageName = this.selectedCat ? (this.selectedCat.name + '_' + new Date().getTime() + '.png') : new Date().getTime() + '.png'
    }
  },
  created() {
  },
  mounted() {
    this.fileList = []
    this.token = this.$store.getters.token
    getImageCategoryList().then(res => {
      this.catList = res.data.data
    })
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onSubmit(form) {
      console.log('onSubmit', form)
      // Not work, ???
      // this.$refs[form].validate((valid) => {
      //   if (!valid) {
      //     console.log('validate fail')
      //     return false
      //   }

      if (!this.imageName || !this.selectedCat) {
        this.$message({ type: 'error', message: '文件名和类别不能为空' })
        return
      }
      console.log('validate success')
      this.loading = true
      this.$refs.upload.submit()
    },
    onSuccess(response, file) {
      this.loading = false
      this.$message({ message: `文件${file.name}上传成功`, type: 'success' })
      this.hide()
      this.$emit('add-success')
    },
    onError(err, file) {
      this.loading = false
      this.$message({ message: `文件${file.name}上传失败：${err}`, type: 'error' })
    }
  }
}
</script>

<style scoped>
</style>
