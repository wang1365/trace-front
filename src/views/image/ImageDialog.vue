<template>
  <el-dialog
    :visible.sync="visible"
    title="添加图片">
    <el-form
      v-loading.fullscreen="loading"
      ref="ruleForm"
      :model="ruleForm"
      :rules="formRules"
      label-width="80px"
      element-loading-text="拼命上传中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form-item label="图片名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写图片名称"/>
      </el-form-item >
      <el-form-item label="类别" prop="catId">
        <el-select v-model="ruleForm.catId" placeholder="请选择类别">
          <el-option v-for="item in catList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :auto-upload="false"
          :limit="1"
          :on-success="onSuccess"
          :on-error="onError"
          :file-list="fileList"
          :data="ruleForm"
          :headers="{ 'cookie-bearer': token}"
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
import { getImageCategoryList, getImageByName } from '@/api/image'

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
      ruleForm: {
        catId: null,
        name: null
      },
      formRules: {
        name: [
          { required: true, message: '请输入图片名称', trigger: 'blur' }
        ],
        catId: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
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
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }

        getImageByName(this.ruleForm.name).then(res => {
          const imageList = res.data.data
          if (imageList.length > 0) {
            this.$message({ message: `文件"${this.ruleForm.name}"在服务器上已经存在！`, type: 'error' })
          } else {
            this.loading = true
            this.$refs.upload.submit()
          }
        }).catch(err => {
          this.$message({ message: `查询失败，${err}`, type: 'error' })
        })
      })
    },
    onSuccess(response, file, fileList) {
      this.loading = false
      this.$message({ message: `文件${file.name}上传成功`, type: 'success' })
      this.hide()
      this.$emit('add-success')
    },
    onError(err, file, fileList) {
      this.loading = false
      this.$message({ message: `文件${file.name}上传失败：${err}`, type: 'error' })
    }
  }
}
</script>

<style scoped>
</style>
