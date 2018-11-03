<template>
  <el-dialog :visible.sync="visible" title="添加公司资质证书" center width="35%">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="公司" prop="companyId">
        <el-select v-model="form.companyId" placeholder="请选择">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="证书链接" pro="url">
        <el-input v-model="form.url" placeholder="请现在图片管理中上传证书"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSubmit('form')">保 存</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllCompany } from '@/api/company'
import { addQualification } from '@/api/qualification'
export default {
  name: 'ReportForm',
  props: {
  },
  data() {
    return {
      visible: false,
      form: {
        companyId: null,
        url: null
      },
      companyList: [],
      rules: {
        companyId: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '链接不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
    getAllCompany()
      .then(response => { this.companyList = response.data.data })
      .catch(err => console.error(err))
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (!valid) {
          return
        }

        addQualification(this.form).then(res => {
          this.$message({ message: `保存成功`, type: 'success' })
          this.$refs['form'].resetFields()
          this.$emit('upload-success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `保存失败：${err}`, type: 'error' })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
