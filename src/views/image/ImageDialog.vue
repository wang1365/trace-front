<template>
  <el-dialog :visible.sync="flag" title="添加图片">
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="80px">
      <el-form-item label="图片名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写图片名称"/>
      </el-form-item>
      <el-form-item label="图片链接" prop="imageUrl">
        <el-input v-model="ruleForm.imageUrl" placeholder="填写图片图片链接"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">添加</el-button>
      <el-button size="small" @click="flag = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addImage } from '@/api/image'

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
      ruleForm: {
        name: null,
        imageUrl: null
      },
      formRules: {
        name: [
          { required: true, message: '请输入图片名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (!newVal) {
        this.$refs['ruleForm'].resetFields()
      }
      this.flag = this.dialogVisible
    }
  },
  created() {
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
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        addImage(this.ruleForm.name, this.ruleForm.imageUrl).then((response) => {
          this.$message({ message: `添加图片成功`, type: 'success' })
          this.$emit('add-success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `添加失败：${err}`, type: 'error' })
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
