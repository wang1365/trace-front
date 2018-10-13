<template>
  <el-dialog :visible.sync="visible" :title="title">
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="80px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写商品名称"/>
      </el-form-item>
      <el-form-item label="图片链接" prop="imageUrl">
        <el-input v-model="ruleForm.imageUrl" placeholder="填写商品图片链接"/>
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
        imageUrl: null
      },
      formRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      }
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

        const restInvoke = this.action === 'modify' ? updateGoods : addGoods
        const msgPrefix = this.action === 'modify' ? '修改' : '添加'
        restInvoke(this.ruleForm).then((response) => {
          this.$message({ message: `${msgPrefix}商品成功`, type: 'success' })
          this.$emit('add-success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `${msgPrefix}失败：${err}`, type: 'error' })
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
