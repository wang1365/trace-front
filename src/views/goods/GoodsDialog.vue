<template>
  <el-dialog :visible.sync="flag" title="添加商品">
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-position="left">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写商品名称"/>
      </el-form-item>
      <el-form-item label="商品图片链接" prop="imageUrl">
        <el-input v-model="ruleForm.imageUrl" placeholder="填写商品图片链接"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">添加</el-button>
      <el-button size="small" @click="flag = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addGoods } from '@/api/goods'

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
          { required: true, message: '请输入商品名称', trigger: 'blur' }
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
    // this.ruleForm = {
    //   name: null,
    //   imageUrl: null
    // }
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
        console.log('$$$$$$$$$$$$$$$$', valid)
        if (!valid) {
          return false
        }
        addGoods(this.ruleForm.name, this.ruleForm.imageUrl).then((response) => {
          this.$message({ message: `添加商品成功`, type: 'success' })
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
