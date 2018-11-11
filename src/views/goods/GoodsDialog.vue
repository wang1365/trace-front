<template>
  <el-dialog :visible.sync="visible" :title="title" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="80px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写商品名称"/>
      </el-form-item>
      <el-form-item label="图片链接1" prop="url1">
        <el-input v-model="ruleForm.url1" placeholder="填写商品图片链接"/>
      </el-form-item>
      <el-form-item label="图片链接2" prop="url2">
        <el-input v-model="ruleForm.url2" placeholder="填写商品图片链接"/>
      </el-form-item>
      <el-form-item label="图片链接3" prop="url3">
        <el-input v-model="ruleForm.url3" placeholder="填写商品图片链接"/>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" placeholder=""/>
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
        url1: null,
        url2: null,
        url3: null,
        desc: null
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
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
