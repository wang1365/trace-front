<template>
  <el-dialog :visible.sync="visible" :title="title" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="80px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写商品名称"/>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" placeholder=""/>
      </el-form-item>
      <el-form-item label="上传图片" prop="desc">
        <el-upload
          :on-preview="handlePreview"
          :on-success="handleUploadSuccess"
          :on-remove="handleRemove"
          :data="postData"
          :file-list="imageList"
          class="upload-demo"
          action="http://upload-z0.qiniu.com"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">保存</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addGoods, updateGoods } from '@/api/goods'
import { getToken } from '@/api/qiniu'

export default {
  name: 'ReportForm',
  props: {
  },
  data() {
    return {
      visible: false,
      action: 'add',
      ruleForm: {
        name: null,
        url1: null,
        url2: null,
        url3: null,
        desc: null
      },
      formRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      },
      postData: { token: null },
      imageList: []
    }
  },
  computed: {
    title() {
      return this.action === 'modify' ? '修改商品' : '添加商品'
    }
  },
  watch: {
  },
  created() {
    getToken().then((res) => {
      this.postData.token = res.data.data
    })
  },
  mounted() {
  },
  methods: {
    show(action, goods) {
      this.action = action
      if (action === 'modify') {
        this.ruleForm = Object.assign({}, goods)
      }
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
        console.log(this.ruleForm)
        const restInvoke = this.action === 'modify' ? updateGoods : addGoods
        const msgPrefix = this.action === 'modify' ? '修改' : '添加'
        restInvoke(this.ruleForm).then((response) => {
          this.$message({ message: `${msgPrefix}商品成功`, type: 'success' })
          this.$emit('add-success')
          this.hide()
        })
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleUploadSuccess(res, file) {
      if (!this.ruleForm.url1) {
        this.ruleForm.url1 = 'https://portal.qiniu.com/bucket/trace/resource' + res.key
      }
    }
  }
}
</script>

<style scoped>
</style>
