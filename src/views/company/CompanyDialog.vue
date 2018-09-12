<template>
  <el-dialog :visible.sync="flag" title="添加公司" center>
    <el-form ref="form" :model="form" label-position="left">
      <el-form-item label="公司名称">
        <el-input v-model="form.name" placeholder="填写公司名称"/>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="form.address" placeholder="填写公司地址"/>
      </el-form-item>
      <el-form-item label="公司法人">
        <el-input v-model="form.owner" placeholder="填写公司法人"/>
      </el-form-item>
      <el-form-item label="公司联系方式">
        <el-input v-model="form.telephone" placeholder="填写公司联系方式"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit()">添加</el-button>
      <el-button size="small" @click="flag = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addCompany } from '@/api/company'
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
        name: null,
        address: null,
        owner: null,
        telephone: null
      }
    }
  },
  watch: {
    dialogVisible(newVal) {
      this.flag = this.dialogVisible
    }
  },
  created() {
    this.form = {
      name: null,
      address: null,
      owner: null,
      telephone: null
    }
  },
  mounted() {
  },
  methods: {
    show() {
      this.flag = true
    },
    hide() {
      this.flag = false
    },
    onPreview(file) {
      console.log(file)
    },
    onSubmit() {
      addCompany(this.form).then(response => {
        this.$message({
          message: `添加上传成功`,
          type: 'success'
        })
        this.$emit('upload-success')
        this.hide()
      }).catch(err => {
        this.$error(`添加失败：${err}`)
      })
    },
    onError(err, file, fileList) {
      this.$error(`添加失败：${err}`)
    },
    getFile(event) {
      this.form.file = event.target.files[0]
    }
  }
}
</script>

<style scoped>

</style>
