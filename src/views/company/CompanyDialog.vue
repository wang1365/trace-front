<template>
  <el-dialog :visible.sync="visible" :title="title" :before-close="onBeforeClose" center>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="form.name" placeholder="填写公司名称"/>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="form.address" placeholder="填写公司地址"/>
      </el-form-item>
      <el-form-item label="公司法人">
        <el-input v-model="form.owner" placeholder="填写公司法人"/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.telephone" placeholder="填写公司联系方式"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('form')">保存</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addCompany, updateCompany } from '@/api/company'
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
      action: 'add',
      form: {
        name: null,
        address: null,
        owner: null,
        telephone: null
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.action === 'modify' ? '修改公司信息' : '添加公司'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    show(action, company) {
      if (action === 'modify') {
        this.action = action
        this.form = Object.assign({}, company)
      } else {
        this.action = 'add'
      }
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onPreview(file) {
      console.log(file)
    },
    onSubmit(form) {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        const callRest = this.action === 'modify' ? updateCompany : addCompany
        callRest(this.form).then(response => {
          this.$message({ message: `添加上传成功`, type: 'success' })
          this.$emit('upload-success')
          this.$refs['form'].resetFields()
          this.hide()
        }).catch(err => {
          this.$error(`添加失败：${err}`)
        })
      })
    },
    onBeforeClose(done) {
      console.log('onBeforeClose')
      if (this.$refs['form']) {
        this.$refs['form'].resetFields()
      }
      done()
    }
  }
}
</script>

<style scoped>

</style>
