<template>
  <el-dialog :visible.sync="flag" title="新增人员">
    <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写姓名"/>
      </el-form-item>
      <el-form-item label="性别" prop="idCard">
        <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
        <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="ruleForm.idCard" placeholder="填写身份证"/>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker v-model="ruleForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="家庭地址" prop="familyAddress">
        <el-input v-model="ruleForm.familyAddress" placeholder="填写家庭地址"/>
      </el-form-item>
      <el-form-item label="联系方式" prop="mobileNo">
        <el-input v-model="ruleForm.mobileNo" placeholder="填写联系方式"/>
      </el-form-item>
      <el-form-item label="单位" prop="company">
        <el-input v-model="ruleForm.company" placeholder="填写单位名称"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">添加</el-button>
      <el-button size="small" @click="flag = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addPerson } from '@/api/person'

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
      goodsList: [],
      reportList: [],
      units: ['kg', '个'],
      ruleForm: {
        name: null,
        idCard: null,
        gender: null,
        birthday: null,
        familyAddress: null,
        mobileNo: null,
        company: null
      },
      formRules: {
        goodsId: [
          { required: true, message: '请选择一个商品', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入人员名称', trigger: 'blur' }
        ],
        orderTime: [
          { required: true, message: '请选择采购时间', trigger: 'blur' }
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
        addPerson(this.ruleForm).then((response) => {
          this.$message({ message: `添加人员成功`, type: 'success' })
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
