<template>
  <el-dialog :visible.sync="flag" title="添加商品">
    <el-form ref="form" :model="form" label-position="left">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" placeholder="填写商品名称"/>
      </el-form-item>
      <el-form-item label="商品图片链接">
        <el-input v-model="form.imageUrl" placeholder="填写商品图片链接"/>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="onSubmit()">添加</el-button>
        <el-button size="small" @click="onSubmit()">取消</el-button>
      </el-form-item>
    </el-form>
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
      form: {
        name: null,
        imageUrl: null
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
      imageUrl: null
    }
    console.log('############ created')
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
      this.$refs['upload'].clearFiles()
    },
    onPreview(file) {
      console.log(file)
    },
    onSubmit() {
      addGoods(this.form.name, this.form.imageUrl).then(response => {
        this.$message({
          message: `添加上传成功`,
          type: 'success'
        })
        this.hide()
        this.$emit('upload-success')
      }).catch(err => {
        this.$error(`添加失败：${err}`)
      })
    },
    onError(err, file, fileList) {
      this.$error(`文件${file.name}上传失败：${err}`)
    },
    getFile(event) {
      this.form.file = event.target.files[0]
    }
  }
}
</script>

<style scoped>

</style>
